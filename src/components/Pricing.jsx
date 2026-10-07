import { useEffect, useId, useRef, useState } from 'react';
import { FREE_SEATS, PLANS } from '../data.js';
import { IconTick } from './Icons.jsx';

const BILLING = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Yearly' },
];

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Counts from the previous value to the new one, so price changes read as a change. */
function useCountTo(value, duration = 450) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    if (reducedMotion()) {
      from.current = value;
      setShown(value);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      const v = a + (value - a) * eased;
      from.current = v;
      setShown(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return Math.round(shown);
}

function Price({ value }) {
  const n = useCountTo(value);
  return <span className="price-num">${n.toLocaleString('en-US')}</span>;
}

function PlanCard({ plan, billing, seats, onSignup }) {
  const per = plan[billing];
  const free = per === 0;
  const fits = !free || seats <= FREE_SEATS;
  const total = per * seats;

  return (
    <article className={'plan' + (plan.featured ? ' featured' : '')} data-reveal>
      <div className="plan-head">
        <h3>{plan.name}</h3>
        {plan.featured && <span className="plan-badge">Most popular</span>}
      </div>
      <p className="plan-blurb">{plan.blurb}</p>

      <p className="plan-price">
        <Price value={per} />
        <span className="price-unit">{free ? 'forever' : 'per person / month'}</span>
      </p>
      <p className="plan-total" aria-live="polite">
        {free ? (
          fits ? (
            `Free for your team of ${seats}`
          ) : (
            `Fits teams of up to ${FREE_SEATS}`
          )
        ) : (
          <>
            Your team of {seats}:{' '}
            <b>
              <Price value={total} />
            </b>{' '}
            / month{billing === 'annual' && ', billed yearly'}
          </>
        )}
      </p>

      <a
        href="#signup"
        className={
          'btn ' + (plan.featured ? 'btn-lime' : 'btn-outline') + (fits ? '' : ' is-muted')
        }
        onClick={(e) => {
          e.preventDefault();
          onSignup();
        }}
      >
        {plan.cta}
      </a>

      <ul className="perks">
        {plan.perks.map((p) => (
          <li key={p}>
            <IconTick />
            {p}
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * Pricing with a monthly / yearly switch and a team-size slider.
 * Prices count to their new value; each card shows what your team would pay.
 */
export default function Pricing({ onSignup }) {
  const [billing, setBilling] = useState('annual');
  const [seats, setSeats] = useState(8);
  const sliderId = useId();
  const pickedIndex = BILLING.findIndex((b) => b.id === billing);

  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Pricing</span>
          <h2 id="pricing-title">
            Pay for the people, <em>not the features.</em>
          </h2>
          <p>
            Start free with up to {FREE_SEATS} people. Upgrade when the team grows, and cancel
            whenever you like.
          </p>
        </div>

        <div className="pricing-controls" data-reveal>
          <div
            className="billing"
            role="radiogroup"
            aria-label="Billing period"
            style={{ '--i': pickedIndex }}
          >
            <span className="billing-thumb" aria-hidden="true" />
            {BILLING.map((b) => (
              <button
                key={b.id}
                type="button"
                role="radio"
                aria-checked={billing === b.id}
                tabIndex={billing === b.id ? 0 : -1}
                onClick={() => setBilling(b.id)}
                onKeyDown={(e) => {
                  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                    e.preventDefault();
                    const next = BILLING[(pickedIndex + 1) % BILLING.length];
                    setBilling(next.id);
                    e.currentTarget.parentElement.querySelector(`[data-id="${next.id}"]`)?.focus();
                  }
                }}
                data-id={b.id}
              >
                {b.label}
                {b.id === 'annual' && <span className="save">Save 20%</span>}
              </button>
            ))}
          </div>

          <div className="seats">
            <label htmlFor={sliderId}>
              Team size{' '}
              <b>
                {seats} {seats === 1 ? 'person' : 'people'}
              </b>
            </label>
            <input
              id={sliderId}
              type="range"
              min="1"
              max="40"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              style={{ '--p': `${((seats - 1) / 39) * 100}%` }}
            />
          </div>
        </div>

        <div className="plans">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billing={billing}
              seats={seats}
              onSignup={onSignup}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
