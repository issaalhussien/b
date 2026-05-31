// Navbar Component

import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/cart', label: 'Cart' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-icon">🍔</span>
            <span className="logo-text">Burger<span>Hub</span></span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  end={path === '/'}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="nav-actions">
            {/* Cart Button */}
            <button
              className="cart-btn"
              onClick={toggleCart}
              aria-label={`Cart - ${itemCount} items`}
            >
              <span className="cart-icon-svg">🛒</span>
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount > 99 ? '99+' : itemCount}</span>
              )}
            </button>

            {/* Order Now CTA */}
            <Link to="/menu" className="btn btn-primary nav-cta">
              Order Now
            </Link>

            {/* Hamburger */}
            <button
              className={`hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-header">
          <span className="logo-text">🍔 Burger<span>Hub</span></span>
          <button onClick={() => setMobileOpen(false)} className="close-mobile">✕</button>
        </div>

        <ul className="mobile-links">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}
                end={path === '/'}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mobile-footer">
          <Link to="/menu" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            🍔 Order Now
          </Link>
          <div className="mobile-contact-info">
            <p>📍 123 Burger Street, Food City</p>
            <p>📞 (+961) 76 97 11 86</p>
          </div>
        </div>
      </div>
    </>
  );
}
