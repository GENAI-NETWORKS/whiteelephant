import { useEffect, useRef, useState } from 'react';
import './About.css';

const highlights = [
  { abbr: 'AW', title: 'Award Winning', desc: 'Recognized for excellence in professional hair styling and customer satisfaction across Salem.' },
  { abbr: 'PP', title: 'Premium Products', desc: 'We use only top-tier professional brands for hair, skin and grooming treatments.' },
  { abbr: 'ET', title: 'Expert Team', desc: 'Our stylists are trained professionals with years of experience in the latest trends.' },
  { abbr: 'US', title: 'Unisex Salon', desc: 'Welcoming services for all including men, women and children in one elegant space.' },
];

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-bg-deco" />
      <div className="container">
        <div ref={sectionRef} className={`about-inner${visible ? ' visible' : ''}`}>
          {/* Left: Images */}
          <div className="about-images">
            <div className="about-img-main-wrap">
              <img
                src="/images/salon_reception.jpg"
                alt="White Elephant Salon Reception"
                className="about-img-main"
              />
              <div className="about-img-badge">
                <span className="about-badge-num">10+</span>
                <span className="about-badge-label">Years of Excellence</span>
              </div>
            </div>
            <div className="about-img-secondary-wrap">
              <img
                src="/images/salon_exterior2.jpg"
                alt="White Elephant Salon Exterior"
                className="about-img-secondary"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="about-content">
            <h2 className="about-title">
              Salem's Premier <br />
              <span className="gold-text">Signature Unisex Salon</span>
            </h2>
            <div className="divider" style={{ margin: '1rem 0' }} />
            <p className="about-text">
              White Elephant Signature Unisex Salon is Salem's most trusted destination for premium
              grooming and beauty services. Located at CVC Arcade on Sarada College Road, we have been
              transforming looks and boosting confidence for over a decade.
            </p>
            <p className="about-text">
              Our philosophy is simple: every client deserves the very best. We combine skilled artistry,
              premium products, and a warm, welcoming ambiance to create an experience that goes far
              beyond a simple haircut. Walk in, unwind, and walk out feeling extraordinary.
            </p>

            {/* Highlights */}
            <div className="about-highlights">
              {highlights.map((h, i) => (
                <div key={i} className="about-highlight">
                  <span className="highlight-abbr">{h.abbr}</span>
                  <div>
                    <h4 className="highlight-title">{h.title}</h4>
                    <p className="highlight-desc">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
