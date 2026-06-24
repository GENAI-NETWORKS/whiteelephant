import { useEffect, useRef, useState } from 'react';
import './Gallery.css';

const galleryItems = [
  { src: '/images/salon_exterior1.jpg', alt: 'White Elephant Salon Building Salem', caption: 'Our Salon Location' },
  { src: '/images/salon_exterior2.jpg', alt: 'White Elephant Salon Exterior View', caption: 'Sarada College Road, Salem' },
  { src: '/images/salon_reception.jpg', alt: 'Salon Reception Area', caption: 'Comfortable Reception' },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const titleRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        {/* Header */}
        <div ref={titleRef} className={`gallery-header${visible ? ' visible' : ''}`}>
          <h2 className="gallery-title">
            Inside <span className="gold-text">White Elephant</span>
          </h2>
          <div className="divider" />
          <p className="gallery-subtitle">
            Step into our world, where every corner reflects our commitment to excellence.
          </p>
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-item${visible ? ' visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
              onClick={() => setSelected(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(item)}
              id={`gallery-item-${i}`}
            >
              <img src={item.src} alt={item.alt} className="gallery-img" loading="lazy" />
        <div className="gallery-overlay">
          <div className="gallery-caption">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <span>{item.caption}</span>
          </div>
        </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close" id="lightbox-close">✕</button>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img src={selected.src} alt={selected.alt} className="lightbox-img" />
            <p className="lightbox-caption">{selected.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
