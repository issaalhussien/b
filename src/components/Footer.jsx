//Footer Component

import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top CTA Strip */}
      <div className="footer-cta">
        <div className="container footer-cta-inner">
          <div className="footer-cta-text">
            <h3>Ready to taste the difference?</h3>
            <p>Order now and get free delivery on orders over $25</p>
          </div>
          <Link to="/menu" className="btn btn-primary">
            🍔 Order Now
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🍔</span>
              <span className="footer-logo-text">Burger<span>Hub</span></span>
            </div>
            <p className="footer-tagline">
              Crafting the perfect burger since 2020. Made with love, served with passion.
            </p>
            <div className="footer-socials">
              <a href="#!" className="social-link" aria-label="Instagram">📸</a>
              <a href="#!" className="social-link" aria-label="Facebook">📘</a>
              <a href="#!" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#!" className="social-link" aria-label="TikTok">🎵</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Our Menu</h4>
            <ul className="footer-links">
              <li><Link to="/menu?cat=burgers">🍔 Burgers</Link></li>
              <li><Link to="/menu?cat=salads">🥗 Salads</Link></li>
              <li><Link to="/menu?cat=kids">🧒 Kids Meals</Link></li>
              <li><Link to="/menu?cat=drinks">🥤 Drinks</Link></li>
              <li><Link to="/menu?cat=combos">📦 Combos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📍</span>
                <span>123 Burger Street, Food City</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:+96176971186">(+961) 76 97 11 86</a>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <a href="mailto:32330094@students.liu.edu.lb">32330094@students.liu.edu.lb</a>
              </li>
              <li>
                <span className="contact-icon">⏰</span>
                <span>Mon–Fri: 11am–10pm<br />Sat–Sun: 10am–11pm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} BurgerHub. All rights reserved.</p>
          <p>Made with ❤️ by Issa Al Hussein | LIU</p>
          <div className="footer-badges">
            <span>🔒 Secure Checkout</span>
            <span>🚚 Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
