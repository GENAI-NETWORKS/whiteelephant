import { useRef, useEffect, useState } from 'react';
import './Contact.css';

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 .02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function Contact({ onBooking }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="contact-section" aria-label="Contact and location">
      <div className="contact-bg-strip" />
      <div className="container">
        <div ref={sectionRef} className={`contact-inner${visible ? ' visible' : ''}`}>
          {/* Header */}
          <div className="contact-header">
            <h2 className="contact-title">
              Visit <span className="gold-text">White Elephant</span> Salon
            </h2>
            <div className="divider" />
            <p className="contact-subtitle">
              Walk in or book an appointment. Your transformation awaits at CVC Arcade, Salem.
            </p>
          </div>

          {/* Grid */}
          <div className="contact-grid">
            {/* Info Cards */}
            <div className="contact-info-col">
              <div className="contact-card">
                <div className="contact-card-icon"><LocationIcon /></div>
                <div>
                  <h4 className="contact-card-title">Address</h4>
                  <p className="contact-card-text">
                    289/5, 6, CVC Arcade,
                    Near A P Medical Center,
                    Sarada College Road,
                    Salem 636 016
                  </p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon"><PhoneIcon /></div>
                <div>
                  <h4 className="contact-card-title">Phone</h4>
                  <a href="tel:+916380598588" className="contact-link" id="contact-phone1">+91 6380 598 588</a>
                  <a href="tel:04274300607" className="contact-link" id="contact-phone2">0427 4300607</a>
                  <a href="tel:04274051519" className="contact-link" id="contact-phone3">0427 4051519</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon"><MailIcon /></div>
                <div>
                  <h4 className="contact-card-title">Email</h4>
                  <a
                    href="mailto:whiteelephantssalonsalem@gmail.com"
                    className="contact-link contact-email"
                    id="contact-email"
                  >
                    whiteelephantssalonsalem@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon"><ClockIcon /></div>
                <div>
                  <h4 className="contact-card-title">Working Hours</h4>
                  <div className="hours-table">
                    <div className="hours-row">
                      <span>Mon to Sat</span>
                      <span className="hours-time">9:00 AM to 8:00 PM</span>
                    </div>
                    <div className="hours-row">
                      <span>Sunday</span>
                      <span className="hours-time">10:00 AM to 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Map + Photo */}
            <div className="contact-map-col">
              <div className="contact-salon-photo-wrap">
                <img
                  src="/images/salon_exterior1.jpg"
                  alt="White Elephant Signature Unisex Salon, Salem exterior view"
                  className="contact-salon-photo"
                />
                <div className="contact-salon-badge">
                  <span className="badge-text">White Elephant Signature Unisex Salon, Salem</span>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="contact-map-wrap">
                <iframe
                  title="White Elephant Salon Location on Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.856064700743!2d78.14259627503847!3d11.657988688580207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1d2c671a4bb%3A0x1a5f3e27d3dca54c!2sSarada%20College%20Road%2C%20Salem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
