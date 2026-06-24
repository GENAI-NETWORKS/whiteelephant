import { useEffect, useRef, useState } from 'react';
import './Services.css';

const services = [
  {
    id: 'haircut',
    title: 'Hair Cut and Styling',
    price: 'From Rs. 299',
    description: 'Expert haircuts tailored to your face shape and personality. From classic cuts to modern trends, our stylists craft the look you deserve.',
    image: '/images/service_haircut.png',
    features: ['Style Consultation', 'Wash and Dry', 'Precision Finish'],
    num: '01',
    tag: 'Unisex',
  },
  {
    id: 'haircolor',
    title: 'Hair Coloring',
    price: 'From Rs. 999',
    description: 'Transform your look with premium hair color treatments. Global color, highlights, balayage and ombre done with professional-grade products.',
    image: '/images/service_haircolor.png',
    features: ['Color Consultation', 'Premium Products', 'Toning and Finish'],
    num: '02',
    tag: 'Popular',
  },
  {
    id: 'facial',
    title: 'Facial and Skin Care',
    price: 'From Rs. 599',
    description: 'Revitalize your skin with luxurious facial treatments. Deep cleansing, hydration and glow-boosting therapies for all skin types.',
    image: '/images/service_facial.png',
    features: ['Skin Analysis', 'Deep Cleanse', 'Hydration Mask'],
    num: '03',
    tag: 'Spa',
  },
  {
    id: 'beard',
    title: 'Beard Grooming',
    price: 'From Rs. 199',
    description: 'Precision beard shaping, trimming, and hot towel shaving for the distinguished gentleman. Look sharp, feel confident.',
    image: '/images/service_beard.png',
    features: ['Beard Trim', 'Hot Towel Shave', 'Beard Oil Treatment'],
    num: '04',
    tag: 'Men',
  },
  {
    id: 'spa',
    title: 'Hair Spa and Treatment',
    price: 'From Rs. 799',
    description: 'Deep conditioning, keratin treatments and nourishing hair masks to restore strength, shine and vitality to your hair.',
    image: '/images/service_spa.png',
    features: ['Scalp Massage', 'Deep Conditioning', 'Protein Treatment'],
    num: '05',
    tag: 'Treat',
  },
  {
    id: 'bridal',
    title: 'Bridal and Party Makeup',
    price: 'From Rs. 2499',
    description: 'Look stunning on your special day. Our makeup artists craft flawless, long-lasting looks for weddings, engagements and celebrations.',
    image: '/images/salon_interior.png',
    features: ['Trial Session', 'HD Makeup', 'Draping and Styling'],
    num: '06',
    tag: 'Special',
  },
];

function ServiceCard({ service, index, onBooking }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`service-card${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="service-card-img-wrap">
        <img src={service.image} alt={service.title} className="service-card-img" />
        <div className="service-card-img-overlay" />
        <span className="service-tag">{service.tag}</span>
        <span className="service-num-badge">{service.num}</span>
      </div>
      <div className="service-card-body">
        <div className="service-card-header">
          <h3 className="service-card-title">{service.title}</h3>
          <span className="service-price">{service.price}</span>
        </div>
        <p className="service-desc">{service.description}</p>
        <ul className="service-features">
          {service.features.map((f) => (
            <li key={f} className="service-feature-item">
              <span className="service-check-dot" />
              {f}
            </li>
          ))}
        </ul>
        <button
          className="btn-primary service-book-btn"
          onClick={() => onBooking(service.title)}
          id={`book-${service.id}`}
        >
          Book This Service
        </button>
      </div>
    </div>
  );
}

export default function Services({ onBooking }) {
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTitleVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services-section">
      <div className="container">
        {/* Header */}
        <div ref={titleRef} className={`services-header${titleVisible ? ' visible' : ''}`}>
          <h2 className="services-title">
            Crafted for Your <span className="gold-text">Perfect Look</span>
          </h2>
          <div className="divider" />
          <p className="services-subtitle">
            From precision haircuts to luxurious spa treatments, every service is delivered by our
            expert team using premium products for exceptional results.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} onBooking={onBooking} />
          ))}
        </div>
      </div>
    </section>
  );
}
