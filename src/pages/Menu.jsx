//Menu Page

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import { menuItems, categories } from '../data/menuData';
import './Menu.css';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Sync category with URL param
  useEffect(() => {
    const cat = searchParams.get('cat') || 'all';
    setActiveCategory(cat);
    console.log("-------->", activeCategory)
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Scroll reveal
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
    return () => observer.disconnect();
  }, [activeCategory]);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setSearchParams(cat !== 'all' ? { cat } : {});
    setSearchQuery('');
  };

  // Filtered + sorted items
  const displayed = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== 'all') {
      items = items.filter(i => i.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'price-asc') items = [...items].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') items = [...items].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') items = [...items].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'popular') items = [...items].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    return items;
  }, [activeCategory, searchQuery, sortBy]);

  const categoryLabel = categories.find(c => c.id === activeCategory)?.label || 'All Items';

  return (
    <main className="menu-page page-enter">

      {/* Hero */}
      <section className="menu-hero">
        <div className="menu-hero-bg" />
        <div className="container menu-hero-content">
          <div className="section-badge" style={{ margin: '0 auto 1rem' }}>🍽️ Full Menu</div>
          <h1 className="hero-title-menu">Our <span>Menu</span></h1>
          <p className="menu-hero-sub">
            Explore our complete selection — burgers, salads, kids meals, drinks & more.
          </p>
        </div>
      </section>

      {/* Search & Sort Bar */}
      <div className="menu-controls-bar">
        <div className="container menu-controls-inner">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search burgers, drinks, salads..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
          <div className="sort-wrap">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Default</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container menu-layout">
        {/* Sidebar Categories */}
        <aside className="category-sidebar">
          <h3 className="sidebar-title">Categories</h3>
          <ul className="category-list">
            {categories.map(cat => {
              const count = cat.id === 'all'
                ? menuItems.length
                : menuItems.filter(i => i.category === cat.id).length;
              return (
                <li key={cat.id}>
                  <button
                    className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategory(cat.id)}
                  >
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-label">{cat.label}</span>
                    <span className="cat-count">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Promo box */}
          <div className="sidebar-promo">
            <div className="promo-icon">🎉</div>
            <h4>Free Delivery</h4>
            <p>On orders over $25</p>
            <div className="promo-badge">Limited Time</div>
          </div>
        </aside>

        {/* Items Grid */}
        <div className="menu-main">
          {/* Header */}
          <div className="menu-main-header">
            <div>
              <h2 className="menu-category-title">{categoryLabel}</h2>
              <p className="menu-count">
                {displayed.length} item{displayed.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Mobile category tabs */}
            <div className="mobile-cats">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`mobile-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategory(cat.id)}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {displayed.length > 0 ? (
            <div className="items-grid">
              {displayed.map((item, i) => (
                <div
                  className="reveal"
                  key={item.id}
                  style={{ transitionDelay: `${Math.min(i * 0.06, 0.4)}s` }}
                >
                  <MenuCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span>🔍</span>
              <h3>No items found</h3>
              <p>Try searching for something else or browse all categories.</p>
              <button
                className="btn btn-primary"
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); setSearchParams({}); }}
              >
                Show All Items
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
