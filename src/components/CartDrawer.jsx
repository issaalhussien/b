// cart panel with full controls

import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    items, isOpen, closeCart,
    itemCount, subtotal, deliveryFee, total,
    increment, decrement, removeItem, clearCart,
  } = useCart();

  return (
    <>
      <div
        className={`cart-backdrop ${isOpen ? 'open' : ''}`}
        onClick={closeCart}
      />
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div className="cart-title">
            <span>🛒</span>
            <h3>Your Order</h3>
            {itemCount > 0 && <span className="cart-count-chip">{itemCount}</span>}
          </div>
          <div className="cart-header-actions">
            {items.length > 0 && (
              <button className="clear-btn" onClick={clearCart}>Clear All</button>
            )}
            <button className="cart-close-btn" onClick={closeCart}>✕</button>
          </div>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <h4>Your cart is empty</h4>
              <p>Add some delicious burgers to get started!</p>
              <Link to="/menu" className="btn btn-primary" onClick={closeCart}>
                Browse Menu
              </Link>
            </div>
          ) : (
            <ul className="cart-items-list">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-img-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop'; }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                    <div className="qty-controls">
                      <button onClick={() => decrement(item.id)} className="qty-btn">−</button>
                      <span className="qty-num">{item.quantity}</span>
                      <button onClick={() => increment(item.id)} className="qty-btn">+</button>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <span className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer (only shown with items) */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Delivery</span>
                <span className="delivery-fee">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="total-row grand">
                <span>Total</span>
                <span className="grand-total">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/cart"
              className="btn btn-primary checkout-btn"
              onClick={closeCart}
            >
              View Full Cart & Checkout →
            </Link>
            <button className="continue-btn" onClick={closeCart}>
              ← Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
