// Home Page

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import { menuItems, stats, testimonials, features } from '../data/menuData';
import './Home.css';

// Animated stat counter
function StatCounter({ value, label, icon }) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        // Just animate opacity for non-numeric
        setDisplayed(value);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-card reveal" ref={ref}>
      <span className="stat-icon">{icon}</span>
      <div className="stat-number">{displayed}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// Testimonial card
function TestimonialCard({ t }) {
  return (
    <div className="testimonial-card reveal">
      <div className="t-stars">{'★'.repeat(t.rating)}</div>
      <p className="t-text">"{t.text}"</p>
      <div className="t-author">
        <div className="t-avatar">{t.avatar}</div>
        <div>
          <strong>{t.name}</strong>
          <span>{t.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const popularItems = menuItems.filter(i => i.popular).slice(0, 4);

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="home page-enter">

      {/* HERO*/}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-particles">
            {[...Array(6)].map((_, i) => (
              <span key={i} className={`particle particle-${i + 1}`}>🍔</span>
            ))}
          </div>
        </div>

        <div className={`hero-content container ${heroLoaded ? 'loaded' : ''}`}>
          <div className="hero-left">
            <div className="section-badge">🔥 #1 Burger in Town</div>
            <h1 className="hero-title">
              Best<br />
              <span>Burger</span><br />
              in Town
            </h1>
            <p className="hero-subtitle">
              Savor the flavor of our handcrafted burgers made with love.
              Fresh ingredients, premium beef, delivered to your door.
            </p>
            <div className="hero-buttons">
              <Link to="/menu" className="btn btn-primary hero-btn">
                🍔 Order Now
              </Link>
              <Link to="/menu" className="btn btn-secondary hero-btn">
                View Full Menu
              </Link>
            </div>
            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-stars">★★★★★</span>
                <span className="trust-text">4.9 Rating</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <span>10K+</span>
                <span className="trust-text">Happy Customers</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <span>30 min</span>
                <span className="trust-text">Avg Delivery</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-image-wrap">
              <div className="hero-image-glow" />
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop"
                alt="BurgerHub Signature Burger"
                className="hero-img"
              />
              {/* Floating badges */}
              <div className="float-badge float-badge-1">
                <span>🔥</span>
                <div>
                  <strong>Fire Beast</strong>
                  <span>$12.99</span>
                </div>
              </div>
              <div className="float-badge float-badge-2">
                <span>⭐</span>
                <div>
                  <strong>Top Rated</strong>
                  <span>4.9/5 stars</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/*  FEATURES STRIP  */}
      <section className="features-strip">
        <div className="container features-grid">
          {features.map((f, i) => (
            <div className="feature-item reveal" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="feature-icon">{f.icon}</span>
              <div>
                <strong>{f.title}</strong>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  POPULAR ITEMS  */}
      <section className="popular-section">
        <div className="container">
          <div className="section-badge reveal">⭐ Fan Favorites</div>
          <h2 className="section-title reveal">
            Most <span>Popular</span> Items
          </h2>
          <p className="section-subtitle reveal">
            Our customers can't stop ordering these — find out why.
          </p>
          <div className="popular-grid">
            {popularItems.map((item, i) => (
              <div className="reveal" key={item.id} style={{ transitionDelay: `${i * 0.1}s` }}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
          <div className="popular-cta reveal">
            <Link to="/menu" className="btn btn-secondary">
              View Full Menu →
            </Link>
          </div>
        </div>
      </section>

      {/*  STATS  */}
      <section className="stats-section">
        <div className="stats-bg" />
        <div className="container">
          <div className="section-badge reveal" style={{color:'#fff', borderColor:'rgba(255,255,255,0.3)', background:'rgba(255,255,255,0.1)'}}>
            📊 By the Numbers
          </div>
          <h2 className="section-title reveal" style={{color:'#fff'}}>
            Why We're <span>The Best</span>
          </h2>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <StatCounter key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/*  ABOUT STRIP  */}
      <section className="about-strip">
        <div className="container about-strip-inner">
          <div className="about-strip-image reveal">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=500&fit=crop"
              alt="Our Kitchen"
            />
            <div className="about-badge-float">
              <span>🧑‍🍳</span>
              <div>
                <strong>Est. 2020</strong>
                <span>Crafted with passion</span>
              </div>
            </div>
          </div>
          <div className="about-strip-text">
            <div className="section-badge reveal">🍔 Our Story</div>
            <h2 className="section-title reveal" style={{textAlign:'left'}}>
              Crafting Perfect<br /><span>Burgers</span> Since 2020
            </h2>
            <p className="reveal" style={{color:'var(--text-gray)', marginBottom:'1rem', lineHeight:'1.8', fontFamily:'var(--font-ui)'}}>
              We believe that a great burger starts with quality ingredients and ends with a smile.
              Our chefs use only the freshest local produce and premium meats to create burgers
              that will make your taste buds dance.
            </p>
            <p className="reveal" style={{color:'var(--text-gray)', marginBottom:'2rem', lineHeight:'1.8', fontFamily:'var(--font-ui)'}}>
              From our humble beginnings in 2020 to becoming the city's most beloved burger spot —
              every bite tells our story of passion, quality, and community.
            </p>
            <div className="reveal">
              <Link to="/about" className="btn btn-primary">
                Learn Our Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*  TESTIMONIALS  */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-badge reveal">💬 What Customers Say</div>
          <h2 className="section-title reveal">
            Real <span>Reviews</span>
          </h2>
          <p className="section-subtitle reveal">
            Don't just take our word for it — hear from our happy customers.
          </p>
          <div className="testimonials-grid">
            {testimonials.slice(0, 3).map(t => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/*  FINAL CTA  */}
      <section className="final-cta">
        <div className="final-cta-bg" />
        <div className="container final-cta-content">
          <h2 className="reveal">
            Ready to Order?<br />
            <span>Your burger is waiting.</span>
          </h2>
          <p className="reveal">
            Fresh, hot, and delivered fast. Order now and taste the difference.
          </p>
          <div className="cta-buttons reveal">
            <Link to="/menu" className="btn btn-primary">
              🍔 Order Now
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              📞 Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
