import { URLS } from '../data.js';

export default function CtaBand({ onSignup }) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="cta" data-reveal>
        <div>
          <p className="cta-eyebrow">Synchronous precision</p>
          <h2 id="cta-title">Ready to ship with calm velocity?</h2>
          <p className="cta-sub">
            Zero drag, natural flow, and absolute editorial clarity for modern engineering teams.
          </p>
        </div>
        <div className="cta-actions">
          <a
            href="#signup"
            className="btn btn-lime"
            onClick={(e) => {
              e.preventDefault();
              onSignup();
            }}
          >
            Start free trial
          </a>
          {URLS.demo && (
            <a href={URLS.demo} className="btn btn-soft">
              Schedule demo
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
