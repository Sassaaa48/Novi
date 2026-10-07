import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data.js';
import Logo from './Logo.jsx';

export default function Nav({ onSignup, onLogin }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('top');

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Highlight the link whose section crosses the middle of the screen.
  useEffect(() => {
    const sections = NAV_LINKS.filter((l) => l.href.startsWith('#'))
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        }),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    setOpen(false);
    onSignup();
  };

  const handleLogin = () => {
    setOpen(false);
    onLogin();
  };

  return (
    <header className="site-nav">
      <div className="nav">
        <Logo label="Novi home" />

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={l.href} aria-current={current === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="login" onClick={handleLogin}>
            Log in
          </button>
          <a href="#signup" className="btn btn-lime btn-sm" onClick={handleSignup}>
            Start free
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>

        <div className={'mobile-menu' + (open ? ' open' : '')} id="mobile-menu">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <button type="button" className="menu-login" onClick={handleLogin}>
            Log in
          </button>
          <a href="#signup" className="btn btn-lime" onClick={handleSignup}>
            Start free
          </a>
        </div>
      </div>
    </header>
  );
}
