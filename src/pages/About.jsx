//About Page

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { features, team, stats } from '../data/menuData';
import './About.css';

const milestones = [
  { year: '2020', title: 'Born from Passion', desc: 'BurgerHub opened its first location in Food City with a simple dream: make the best burger in town.' },
  { year: '2021', title: 'Growing Community', desc: 'We welcomed our 1,000th customer and expanded our menu with specialty salads and kids meals.' },
  { year: '2022', title: 'Award Winning', desc: 'Named "Best Burger in the City" by Food Magazine. Our Truffle Luxury Burger became a local legend.' },
  { year: '2023', title: 'Online Ordering', desc: 'Launched our online ordering platform, making it even easier for fans to enjoy BurgerHub.' },
  { year: '2024', title: 'The Future', desc: 'Serving 10,000+ happy customers and counting. We\'re just getting started on our burger journey.' },
];

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-page page-enter">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="container about-hero-content">
          <div className="section-badge">🍔 Our Story</div>
          <h1 className="about-hero-title">
            More Than Just a <span>Burger</span>
          </h1>
          <p className="about-hero-sub">
            We're a team of passionate food lovers dedicated to crafting the most satisfying
            burger experience — one bite at a time.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container mission-grid">
          <div className="mission-text">
            <div className="section-badge reveal">🌟 Our Mission</div>
            <h2 className="section-title reveal" style={{textAlign:'left'}}>
              Crafting Perfect <span>Burgers</span> Since 2020
            </h2>
            <p className="reveal" style={{color:'var(--text-gray)', lineHeight:'1.9', fontFamily:'var(--font-ui)', marginBottom:'1rem'}}>
              We believe that a great burger starts with quality ingredients and ends with a smile.
              Our chefs use only the freshest local produce and premium meats to create burgers
              that will make your taste buds dance.
            </p>
            <p className="reveal" style={{color:'var(--text-gray)', lineHeight:'1.9', fontFamily:'var(--font-ui)', marginBottom:'2rem'}}>
              From the very first bite, we want you to feel the difference that quality, passion,
              and care make. That's not just our mission — it's our promise to every customer
              who walks through our doors.
            </p>
            <div className="mission-values reveal">
              {['Quality First', 'Made Fresh Daily', 'Community Driven', 'Innovation'].map(v => (
                <span className="value-chip" key={v}>✓ {v}</span>
              ))}
            </div>
          </div>
          <div className="mission-images reveal">
            <div className="mission-img-grid">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" alt="Our kitchen" className="mission-img main-img" />
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop" alt="Burger" className="mission-img side-img-1" />
              <img src="https://images.unsplash.com/photo-1550317138-10000687a72b?w=200&h=200&fit=crop" alt="Another burger" className="mission-img side-img-2" />
            </div>
            <div className="mission-badge">
              <span>🏆</span>
              <div>
                <strong>Award Winning</strong>
                <span>Best Burger 2022</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="about-stats-bg" />
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((s, i) => (
              <div className="about-stat reveal" key={i} style={{transitionDelay:`${i*0.1}s`}}>
                <div className="about-stat-icon">{s.icon}</div>
                <div className="about-stat-num">{s.number}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-badge reveal">📅 Our Journey</div>
          <h2 className="section-title reveal">
            The <span>BurgerHub</span> Story
          </h2>
          <div className="divider reveal" />
          <div className="timeline">
            {milestones.map((m, i) => (
              <div
                className={`timeline-item reveal ${i % 2 === 0 ? 'left' : 'right'}`}
                key={i}
                style={{transitionDelay:`${i*0.12}s`}}
              >
                <div className="timeline-content">
                  <span className="timeline-year">{m.year}</span>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-badge reveal">💡 What We Stand For</div>
          <h2 className="section-title reveal">
            Our <span>Core Values</span>
          </h2>
          <p className="section-subtitle reveal">
            These aren't just words — they're the principles that guide every burger we make.
          </p>
          <div className="values-grid">
            {features.map((f, i) => (
              <div className="value-card reveal" key={i} style={{transitionDelay:`${i*0.1}s`}}>
                <div className="value-card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-badge reveal">👨‍🍳 Meet the Team</div>
          <h2 className="section-title reveal">
            The <span>Chefs</span> Behind the Magic
          </h2>
          <p className="section-subtitle reveal">
            Our passionate culinary team brings years of experience and love for food to every dish.
          </p>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card reveal" key={member.id} style={{transitionDelay:`${i*0.15}s`}}>
                <div className="team-avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-bg" />
        <div className="container about-cta-content">
          <h2 className="reveal">Come Visit Us!</h2>
          <div className="contact-info-cards reveal">
            <div className="info-card">
              <span>📍</span>
              <div>
                <strong>Address</strong>
                <p>123 Burger Street, Food City</p>
              </div>
            </div>
            <div className="info-card">
              <span>📞</span>
              <div>
                <strong>Phone</strong>
                <p>(+961) 76 97 11 86</p>
              </div>
            </div>
            <div className="info-card">
              <span>⏰</span>
              <div>
                <strong>Hours</strong>
                <p>Mon–Fri: 11am–10pm</p>
                <p>Sat–Sun: 10am–11pm</p>
              </div>
            </div>
          </div>
          <div className="reveal" style={{marginTop:'2rem'}}>
            <Link to="/menu" className="btn btn-primary">🍔 Order Now</Link>
            <Link to="/contact" className="btn btn-secondary" style={{marginLeft:'16px'}}>Contact Us</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
