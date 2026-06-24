import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const cyclingWords = ['Confidence', 'Elegance', 'Precision', 'Excellence'];

export default function Hero({ onBooking }) {
  const heroRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % cyclingWords.length);
        setAnimating(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={heroRef} className="hero" aria-label="Hero section">
      {/* Background */}
      <div className="hero-bg">
        <img
          src="/images/salon_interior.png"
          alt="White Elephant Signature Unisex Salon interior Salem"
          className="hero-bg-img"
          onLoad={() => setLoaded(true)}
          fetchPriority="high"
        />
        <div className="hero-overlay" />
        {/* Diagonal split accent */}
        <div className="hero-split-accent" />
      </div>

      {/* Grid layout */}
      <div className={`hero-grid${loaded ? ' loaded' : ''}`}>
        {/* Left column — main copy */}
        <div className="hero-left">
          {/* Headline with cycling word */}
          <h1 className="hero-heading">
            <span className="hero-heading-line1">Style Crafted</span>
            <span className="hero-heading-line2">
              With{' '}
              <span className="hero-word-wrap">
                <span className={`hero-word${animating ? ' out' : ' in'}`} key={wordIndex}>
                  {cyclingWords[wordIndex]}
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-subtext">
            Salem's most distinguished unisex salon. Premium hair care, skin treatments
            and grooming, all delivered by expert stylists using professional-grade products.
          </p>

          {/* CTA row */}
          <div className="hero-ctas">
            <button className="btn-primary hero-cta-primary" onClick={onBooking} id="hero-book-btn">
              Book Appointment
            </button>
            <button className="btn-outline hero-cta-secondary" onClick={scrollToServices} id="hero-services-btn">
              Explore Services
            </button>
          </div>
        </div>

        {/* Right column — stats panel */}
        <div className="hero-right">
          <div className="hero-stats-panel">
            <div className="hero-stat-item">
              <span className="hero-stat-num">500</span>
              <span className="hero-stat-plus">+</span>
              <span className="hero-stat-label">Happy Clients</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="hero-stat-num">10</span>
              <span className="hero-stat-plus">+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="hero-stat-num">15</span>
              <span className="hero-stat-plus">+</span>
              <span className="hero-stat-label">Expert Stylists</span>
            </div>
          </div>


        </div>
      </div>

      {/* Bottom service tags */}
      <div className={`hero-service-row${loaded ? ' loaded' : ''}`}>
        {['Hair Cutting', 'Hair Coloring', 'Facial', 'Beard Grooming', 'Hair Spa', 'Bridal Makeup'].map((s) => (
          <span key={s} className="hero-service-tag">{s}</span>
        ))}
      </div>
    </section>
  );
}
