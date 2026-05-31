// MenuCard Component

import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import './MenuCard.css';

export default function MenuCard({ item }) {
  const { addItem, toggleCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleAddAndOpen = () => {
    addItem(item);
    toggleCart();
  };

  const stars = '★'.repeat(Math.floor(item.rating)) + (item.rating % 1 >= 0.5 ? '½' : '');

  return (
    <div className="menu-card">
      {/* Image */}
      <div className="card-image-wrap">
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' : item.image}
          alt={item.name}
          className="card-image"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        {/* Badge */}
        {item.badge && (
          <span className={`card-badge badge badge-${item.badge}`}>
            {item.badge === 'hot' ? '🔥 Hot' : item.badge === 'new' ? '✨ New' : '👑 Premium'}
          </span>
        )}
        {item.popular && (
          <span className="card-popular">⭐ Popular</span>
        )}
        {/* Quick add overlay */}
        <div className="card-overlay">
          <button className="overlay-btn" onClick={handleAddAndOpen}>
            🛒 Quick Add
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="card-content">
        <div className="card-top">
          <h3 className="card-name">{item.name}</h3>
          <span className="card-price">${item.price.toFixed(2)}</span>
        </div>

        <p className="card-desc">{item.description}</p>

        {/* Rating */}
        <div className="card-rating">
          <span className="stars">{stars}</span>
          <span className="rating-num">{item.rating.toFixed(1)}</span>
          <span className="rating-count">({item.reviews} reviews)</span>
        </div>

        {/* Add to Cart */}
        <button
          className={`card-add-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ Added to Cart!' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  );
}
