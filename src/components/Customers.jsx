import { LOGOS, TESTIMONIALS } from '../data.js';

const MARKS = ['circle', 'square', 'diamond', 'ring'];

function LogoRow({ hidden }) {
  return (
    <ul className="logo-row" aria-hidden={hidden || undefined}>
      {LOGOS.map((name, i) => (
        <li key={name} className={`logo-item mark-${MARKS[i % MARKS.length]}`}>
          <i aria-hidden="true" />
          {name}
        </li>
      ))}
    </ul>
  );
}

/** Logo marquee plus three short quotes. The marquee pauses on hover and stops for reduced motion. */
export default function Customers() {
  return (
    <section className="customers" id="customers" aria-labelledby="customers-title">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Customers</span>
          <h2 id="customers-title">
            Small teams, <em>fewer tabs.</em>
          </h2>
          <p>More than 2,000 startups, agencies, and product teams plan their week in Novi.</p>
        </div>
      </div>

      <div className="marquee" data-reveal aria-label="Teams using Novi" role="region">
        <div className="marquee-track">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>

      <div className="wrap">
        <div className="quotes">
          {TESTIMONIALS.map((t, i) => (
            <figure className="quote-card" key={t.name} data-reveal style={{ '--rd': i }}>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <span className="avatar" style={{ '--c': i === 1 ? 'var(--lime)' : undefined }}>
                  {t.who}
                </span>
                <span>
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
