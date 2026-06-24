import './Footer.css';

export default function Footer({ onBooking }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top-bar" />
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src="/logo.jpeg" alt="White Elephant Salon" className="footer-logo-img" />
              <div>
                <span className="footer-logo-name">White Elephant</span>
                <span className="footer-logo-sub">Signature Unisex Salon</span>
              </div>
            </div>
            <p className="footer-tagline">
              Where every visit is an experience of luxury, style, and transformation. Salem's most trusted destination for premium beauty services.
            </p>
            <button className="btn-primary footer-book-btn" onClick={onBooking} id="footer-book-btn">
              Book Appointment
            </button>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {[
                { href: '#hero', label: 'Home' },
                { href: '#services', label: 'Services' },
                { href: '#gallery', label: 'Gallery' },
                { href: '#about', label: 'About Us' },
                { href: '#contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="footer-link"
                    onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links">
              {['Hair Cut and Styling', 'Hair Coloring', 'Facial and Skin Care', 'Beard Grooming', 'Hair Spa and Treatment', 'Bridal Makeup'].map((s) => (
                <li key={s}>
                  <span className="footer-link footer-service-item">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Info</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span className="footer-contact-dot" />
                <span>289/5, 6, CVC Arcade, Near A P Medical Center, Sarada College Road, Salem 636 016</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-dot" />
                <div>
                  <a href="tel:+916380598588" className="footer-phone" id="footer-phone1">+91 6380 598 588</a>
                  <a href="tel:04274300607" className="footer-phone" id="footer-phone2">0427 4300607</a>
                </div>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-dot" />
                <a href="mailto:whiteelephantssalonsalem@gmail.com" className="footer-email" id="footer-email">
                  whiteelephantssalonsalem@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} White Elephant Signature Unisex Salon. All rights reserved.
          </p>
          <p className="footer-copy-sub">
            Sarada College Road, Salem, Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
