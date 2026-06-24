import { useState, useRef, useEffect } from 'react';
import './BookingModal.css';

const services = [
  'Hair Cut and Styling',
  'Hair Coloring',
  'Facial and Skin Care',
  'Beard Grooming',
  'Hair Spa and Treatment',
  'Bridal and Party Makeup',
  'Keratin Treatment',
  'Waxing and Threading',
  'Head Massage',
  'Nail Care',
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
];

const getTodayMin = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export default function BookingModal({ isOpen, onClose, preselectedService }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedService || '',
    date: '',
    time: '',
    notes: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    if (preselectedService) {
      setForm((f) => ({ ...f, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const validate1 = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim() || !/^\+?[\d\s\-]{10,}$/.test(form.phone)) errs.phone = 'Valid phone number required';
    if (!form.gender) errs.gender = 'Please select gender';
    return errs;
  };

  const validate2 = () => {
    const errs = {};
    if (!form.service) errs.service = 'Please select a service';
    if (!form.date) errs.date = 'Please select a date';
    if (!form.time) errs.time = 'Please select a time slot';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const nextStep = () => {
    const errs = step === 1 ? validate1() : {};
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate2();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleDone = () => {
    const message = `Hello White Elephant Salon! 🐘
I would like to confirm my appointment. Here are my details:

*Name:* ${form.name}
*Phone:* ${form.phone}
*Gender:* ${form.gender}
*Service:* ${form.service}
*Date:* ${new Date(form.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
*Time:* ${form.time}
${form.notes ? `*Notes:* ${form.notes}\n` : ''}
Please confirm my booking. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/916380598588?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-container" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <img src="/logo.jpeg" alt="Logo" className="modal-logo" />
            <div>
              <h2 className="modal-title" id="modal-title">Book Appointment</h2>
              <p className="modal-subtitle">White Elephant Signature Unisex Salon</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal" id="modal-close-btn">✕</button>
        </div>

        {!submitted ? (
          <>
            {/* Step Indicator */}
            <div className="modal-steps">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`step-item${step >= s ? ' active' : ''}${step > s ? ' done' : ''}`}>
                  <div className="step-circle">{step > s ? <CheckIcon /> : s}</div>
                  <span className="step-label">
                    {s === 1 ? 'Your Info' : s === 2 ? 'Service and Time' : 'Confirm'}
                  </span>
                  {s < 3 && <div className={`step-line${step > s ? ' done' : ''}`} />}
                </div>
              ))}
            </div>

            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="modal-step-content">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`form-input${errors.name ? ' error' : ''}`}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={`form-input${errors.phone ? ' error' : ''}`}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email (Optional)</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gender *</label>
                    <div className="gender-options">
                      {['Male', 'Female', 'Other'].map((g) => (
                        <label key={g} className={`gender-option${form.gender === g ? ' selected' : ''}`}>
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={form.gender === g}
                            onChange={handleChange}
                          />
                          {g}
                        </label>
                      ))}
                    </div>
                    {errors.gender && <span className="form-error">{errors.gender}</span>}
                  </div>

                  <button type="button" className="btn-primary modal-next-btn" onClick={nextStep} id="booking-step1-next">
                    Continue
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              )}

              {/* Step 2: Service & Time */}
              {step === 2 && (
                <div className="modal-step-content">
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Select Service *</label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`form-input form-select${errors.service ? ' error' : ''}`}
                    >
                      <option value="">Choose a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <span className="form-error">{errors.service}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="date" className="form-label">Preferred Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={getTodayMin()}
                      className={`form-input${errors.date ? ' error' : ''}`}
                    />
                    {errors.date && <span className="form-error">{errors.date}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Time *</label>
                    <div className="time-grid">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`time-slot${form.time === t ? ' selected' : ''}`}
                          onClick={() => { setForm((f) => ({ ...f, time: t })); if (errors.time) setErrors((e) => ({ ...e, time: '' })); }}
                          id={`time-${t.replace(/\s|:/g, '-')}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {errors.time && <span className="form-error">{errors.time}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="notes" className="form-label">Special Notes (Optional)</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any specific requests or notes..."
                      rows={3}
                      className="form-input form-textarea"
                    />
                  </div>

                  <div className="modal-btn-row">
                    <button type="button" className="btn-outline modal-back-btn" onClick={prevStep} id="booking-step2-back">
                      Back
                    </button>
                    <button type="button" className="btn-primary modal-next-btn flex-1" onClick={nextStep} id="booking-step2-next">
                      Review
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <div className="modal-step-content">
                  <div className="confirm-card">
                    <h3 className="confirm-title">Appointment Summary</h3>
                    <div className="confirm-rows">
                      <div className="confirm-row">
                        <span className="confirm-label">Name</span>
                        <span className="confirm-value">{form.name}</span>
                      </div>
                      <div className="confirm-row">
                        <span className="confirm-label">Phone</span>
                        <span className="confirm-value">{form.phone}</span>
                      </div>
                      <div className="confirm-row">
                        <span className="confirm-label">Gender</span>
                        <span className="confirm-value">{form.gender}</span>
                      </div>
                      <div className="confirm-row">
                        <span className="confirm-label">Service</span>
                        <span className="confirm-value gold">{form.service}</span>
                      </div>
                      <div className="confirm-row">
                        <span className="confirm-label">Date</span>
                        <span className="confirm-value">{new Date(form.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="confirm-row">
                        <span className="confirm-label">Time</span>
                        <span className="confirm-value">{form.time}</span>
                      </div>
                      {form.notes && (
                        <div className="confirm-row">
                          <span className="confirm-label">Notes</span>
                          <span className="confirm-value">{form.notes}</span>
                        </div>
                      )}
                    </div>
                    <div className="confirm-salon-info">
                      <p>289/5, 6, CVC Arcade, Near A P Medical Center, Sarada College Road, Salem 636 016</p>
                      <p>+91 6380 598 588 | 0427 4300607</p>
                    </div>
                  </div>

                  <div className="modal-btn-row">
                    <button type="button" className="btn-outline modal-back-btn" onClick={prevStep} id="booking-step3-back">
                      Edit
                    </button>
                    <button type="submit" className="btn-primary modal-next-btn flex-1" id="booking-submit">
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        ) : (
          /* Success State */
          <div className="booking-success">
            <div className="success-icon-wrap">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 className="success-title">Appointment Confirmed!</h3>
            <p className="success-text">
              Thank you, <strong>{form.name}</strong>. Your appointment for{' '}
              <strong className="gold-text">{form.service}</strong> on{' '}
              <strong>{new Date(form.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</strong>{' '}
              at <strong>{form.time}</strong> has been booked.
            </p>
            <div className="success-contact">
              <p>For any changes, please contact us:</p>
              <a href="tel:+916380598588" className="success-phone" id="success-call">+91 6380 598 588</a>
            </div>
            <button className="btn-primary success-close-btn" onClick={handleDone} id="booking-success-close">
              Done (Send to WhatsApp)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
