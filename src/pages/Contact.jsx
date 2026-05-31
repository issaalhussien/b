//Contact Page

import { useState, useEffect } from 'react';
import './Contact.css';

const faqs = [
  { q: 'What are your delivery hours?', a: 'We deliver Monday–Friday 11am–10pm and Saturday–Sunday 10am–11pm.' },
  { q: 'Do you offer vegetarian options?', a: 'Yes! Our Green Garden Burger and all salads are great vegetarian-friendly options.' },
  { q: 'How long does delivery take?', a: 'Our average delivery time is 30 minutes or less. We respect your hunger!' },
  { q: 'Can I customize my burger?', a: 'Absolutely! Contact us directly and our chefs will accommodate your preferences.' },
  { q: 'Do you offer catering?', a: 'Yes, we offer catering for events. Contact us at least 48 hours in advance for large orders.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [openFaq, setOpenFaq] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    );
    setTimeout(() => document.querySelectorAll('.reveal').forEach(el => observer.observe(el)), 100);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    console.log(form)
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1800);
  };

  return (
    <main className="contact-page page-enter">

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="container contact-hero-content">
          <div className="section-badge">📬 Get In Touch</div>
          <h1 className="contact-hero-title">
            Contact <span>Us</span>
          </h1>
          <p className="contact-hero-sub">
            Have a question, feedback, or a catering request? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            {[
              { icon: '📍', title: 'Visit Us', lines: ['123 Burger Street', 'Food City, FC 12345'] },
              { icon: '📞', title: 'Call Us', lines: ['(+961) 76 97 11 86', 'Mon–Sun 10am–11pm'] },
              { icon: '✉️', title: 'Email Us', lines: ['32330094@students.liu.edu.lb', 'Reply within 24 hours'] },
              { icon: '⏰', title: 'Opening Hours', lines: ['Mon–Fri: 11am–10pm', 'Sat–Sun: 10am–11pm'] },
            ].map((card, i) => (
              <div className="contact-card reveal" key={i} style={{transitionDelay:`${i*0.1}s`}}>
                <div className="contact-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                {card.lines.map((l, j) => <p key={j}>{l}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="contact-main-section">
        <div className="container contact-main-grid">

          {/* Form */}
          <div className="contact-form-wrap reveal">
            <div className="section-badge">📝 Send a Message</div>
            <h2 className="form-title">We'd Love to Hear From You</h2>
            <p className="form-subtitle">Fill out the form and we'll get back to you within 24 hours.</p>

            {status === 'success' ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Issa al hussien"
                      value={form.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="issa@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder=" XX XXX XXX"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="form-input form-select"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="catering">Catering Request</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    value={form.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary submit-btn ${status === 'sending' ? 'sending' : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <><span className="spinner" /> Sending...</>
                  ) : (
                    '📤 Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map + Social */}
          <div className="contact-side reveal">
            {/* Map Placeholder */}
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-pin">📍</div>
                <div className="map-label">
                  <strong>BurgerHub</strong>
                  <span>123 Burger Street, Food City</span>
                </div>
                <div className="map-grid">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className={`map-cell ${i === 9 ? 'active' : ''}`} />
                  ))}
                </div>
              </div>
              <div className="map-overlay-text">
                <span>🗺️</span>
                <p>123 Burger Street, Food City</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{marginTop:'10px', fontSize:'0.82rem', padding:'8px 18px'}}
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-links-grid">
                {[
                  { icon: '📸', label: 'Instagram', handle: '@burgerhub' },
                  { icon: '📘', label: 'Facebook', handle: 'BurgerHub' },
                  { icon: '🐦', label: 'Twitter/X', handle: '@burgerhub' },
                  { icon: '🎵', label: 'TikTok', handle: '@burgerhub' },
                ].map(s => (
                  <a key={s.label} href="#!" className="social-card">
                    <span className="social-card-icon">{s.icon}</span>
                    <div>
                      <strong>{s.label}</strong>
                      <span>{s.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container faq-inner">
          <div className="section-badge reveal">❓ FAQ</div>
          <h2 className="section-title reveal">
            Frequently Asked <span>Questions</span>
          </h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                className={`faq-item reveal ${openFaq === i ? 'open' : ''}`}
                key={i}
                style={{transitionDelay:`${i*0.08}s`}}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-arrow">{openFaq === i ? '▲' : '▼'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
