import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { href: '#hero',     label: 'Home',    num: '01' },
  { href: '#services', label: 'Services', num: '02' },
  { href: '#gallery',  label: 'Gallery',  num: '03' },
  { href: '#about',    label: 'About',    num: '04' },
  { href: '#contact',  label: 'Contact',  num: '05' },
];

export default function Navbar({ onBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 280);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#hero" className="navbar-logo" onClick={(e) => handleNavClick(e, '#hero')}>
            <div className="logo-img-wrap">
              <img src="/logo.jpeg" alt="White Elephant Salon Logo" className="logo-img" />
            </div>
            <div className="logo-text">
              <span className="logo-name">White Elephant</span>
              <span className="logo-sub">Signature Unisex Salon</span>
            </div>
          </a>

          <div className="navbar-links">
            {navLinks.slice(1).map((l) => (
              <a key={l.href} href={l.href} className="nav-link" onClick={(e) => handleNavClick(e, l.href)}>
                {l.label}
              </a>
            ))}
          </div>

          <button className="btn-primary nav-book-btn" onClick={onBooking} id="nav-book-btn">
            Book Appointment
          </button>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            id="hamburger-btn"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`drawer-backdrop${menuOpen ? ' visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Right-to-left slide drawer — vertically centred */}
      <aside className={`side-drawer${menuOpen ? ' open' : ''}`} aria-label="Navigation">

        {/* Header */}
        <div className="drawer-head">
          <span className="drawer-head-label">Navigation</span>
          <button
            className="drawer-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close"
            id="drawer-close-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="drawer-gold-line" />

        {/* Links */}
        <nav className="drawer-nav">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="drawer-nav-link"
              onClick={(e) => handleNavClick(e, l.href)}
              style={{ transitionDelay: menuOpen ? `${i * 0.06 + 0.08}s` : '0s' }}
              id={`drawer-${l.href.replace('#', '')}`}
            >
              <span className="drawer-num">{l.num}</span>
              <span className="drawer-label">{l.label}</span>
              <svg className="drawer-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          ))}
        </nav>

        <div className="drawer-gold-line" />

        {/* Book CTA */}
        <div className="drawer-cta">
          <button
            className="btn-primary drawer-book"
            onClick={() => { setMenuOpen(false); onBooking(); }}
            id="drawer-book-btn"
          >
            Book Appointment
          </button>
          <a href="tel:+916380598588" className="drawer-phone" id="drawer-phone">
            +91 6380 598 588
          </a>
        </div>

      </aside>
    </>
  );
}
