import Logo from './Logo.jsx';
import SignupForm from './SignupForm.jsx';
import { IconArrowUp } from './Icons.jsx';
import { FOOTER_LINKS, LEGAL_LINKS, SOCIALS } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer" id="signup">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Logo round label="Novi home" />
            <p className="foot-tag">Calm project management for fast-moving teams.</p>
            <p className="foot-copy">© 2026 Novi, Inc. All rights reserved.</p>
          </div>

          <nav className="foot-links" aria-label="Footer">
            {FOOTER_LINKS.map((group) => (
              <div className="foot-col" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href}>{l.label}</a>
                      {l.badge && <span className="badge">{l.badge}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="foot-updates">
            <h3>Get product updates</h3>
            <SignupForm
              buttonLabel="Subscribe"
              placeholder="you@company.com"
              defaultMessage="One email a month. No spam."
              successMessage={(email) => `Subscribed. The next update goes to ${email}.`}
            />
            {SOCIALS.length > 0 && (
              <>
                <h3 className="follow">Follow us</h3>
                <div className="socials">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      {...(href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="wordmark" aria-hidden="true">
          n<span className="o">o</span>v<span className="i">ı</span>
        </div>

        <div className="foot-bottom">
          <span>© 2026 Novi, Inc.</span>
          <div className="foot-bottom-end">
            {LEGAL_LINKS.length > 0 && (
              <nav aria-label="Legal">
                {LEGAL_LINKS.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </nav>
            )}
            <a href="#top" className="to-top" aria-label="Back to top">
              <IconArrowUp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
