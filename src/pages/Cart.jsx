// Cart Page

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import './Cart.css';

export default function Cart() {
  const {
    items, itemCount, subtotal, deliveryFee, total,
    increment, decrement, removeItem, clearCart,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState(1); // 1 = cart, 2 = info, 3 = confirm
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [checkoutForm, setCheckoutForm] = useState({
    name: '', email: '', phone: '', address: '', notes: '', payment: 'card',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [checkoutStep]);

  const handleFormChange = (e) => {
    setCheckoutForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!checkoutForm.name.trim()) e.name = 'Required';
    if (!checkoutForm.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(checkoutForm.email)) e.email = 'Invalid email';
    if (!checkoutForm.phone.trim()) e.phone = 'Required';
    if (!checkoutForm.address.trim()) e.address = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    const num = `BH-${Date.now().toString().slice(-6)}`;
    setOrderNumber(num);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <main className="cart-page page-enter">
        <div className="container order-success">
          <div className="success-animation">🎉</div>
          <h1>Order Placed Successfully!</h1>
          <p className="order-number">Order # <strong>{orderNumber}</strong></p>
          <p className="success-msg">
            Thank you, <strong>{checkoutForm.name}</strong>! Your order is being prepared.
            We'll send a confirmation to <strong>{checkoutForm.email}</strong>.
          </p>
          <div className="success-timeline">
            {['Order Received', 'Preparing', 'On the Way', 'Delivered'].map((step, i) => (
              <div className={`success-step ${i === 0 ? 'done' : i === 1 ? 'active' : ''}`} key={step}>
                <div className="step-dot" />
                <span>{step}</span>
              </div>
            ))}
            <div className="success-line" />
          </div>
          <div className="success-eta">
            <span>⏱️</span>
            <div>
              <strong>Estimated Delivery</strong>
              <p>25–35 minutes</p>
            </div>
          </div>
          <Link to="/menu" className="btn btn-primary">
            🍔 Order More
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="cart-page page-enter">
        <div className="container empty-cart-page">
          <div className="empty-emoji">🛒</div>
          <h1>Your Cart is Empty</h1>
          <p>Looks like you haven't added anything yet. Let's fix that!</p>
          <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page page-enter">

      {/* Header */}
      <section className="cart-hero">
        <div className="cart-hero-bg" />
        <div className="container cart-hero-content">
          <h1 className="cart-title">
            {checkoutStep === 1 ? '🛒 Your Cart' : checkoutStep === 2 ? '📋 Delivery Info' : '✅ Confirm Order'}
          </h1>
          {/* Progress */}
          <div className="checkout-progress">
            {['Cart', 'Your Info', 'Confirm'].map((label, i) => (
              <div className={`progress-step ${checkoutStep > i + 1 ? 'done' : checkoutStep === i + 1 ? 'active' : ''}`} key={label}>
                <div className="progress-dot">
                  {checkoutStep > i + 1 ? '✓' : i + 1}
                </div>
                <span>{label}</span>
              </div>
            ))}
            <div className="progress-bar">
              <div className="progress-fill" style={{width:`${((checkoutStep - 1) / 2) * 100}%`}} />
            </div>
          </div>
        </div>
      </section>

      <div className="container cart-layout">

        {/* STEP 1: Cart Items*/}
        {checkoutStep === 1 && (
          <>
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h2>{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</h2>
                <button className="clear-all-btn" onClick={clearCart}>🗑️ Clear All</button>
              </div>
              <div className="cart-items-list-full">
                {items.map(item => (
                  <div className="cart-item-row" key={item.id}>
                    <div className="cart-item-img-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop'; }}
                      />
                    </div>
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p className="cart-item-desc">{item.description?.slice(0, 80)}...</p>
                      <p className="cart-item-unit">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="cart-item-controls-full">
                      <div className="qty-box">
                        <button onClick={() => decrement(item.id)} className="qty-btn-full">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increment(item.id)} className="qty-btn-full">+</button>
                      </div>
                      <span className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>
                      <button className="remove-item-btn" onClick={() => removeItem(item.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/menu" className="btn btn-ghost continue-shopping">
                ← Continue Shopping
              </Link>
            </div>
            <div className="cart-summary">
              <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
              <button className="btn btn-primary checkout-next" onClick={() => setCheckoutStep(2)}>
                Proceed to Checkout →
              </button>
              <div className="secure-badge">🔒 Secure Checkout</div>
            </div>
          </>
        )}

        {/* STEP 2: Delivery Info */}
        {checkoutStep === 2 && (
          <>
            <div className="checkout-form-section">
              <h2>Delivery Information</h2>
              <div className="checkout-form">
                <div className="form-row-2">
                  <InputField label="Full Name *" name="name" value={checkoutForm.name} onChange={handleFormChange} error={errors.name} placeholder="John Doe" />
                  <InputField label="Email *" name="email" type="email" value={checkoutForm.email} onChange={handleFormChange} error={errors.email} placeholder="john@example.com" />
                </div>
                <div className="form-row-2">
                  <InputField label="Phone *" name="phone" type="tel" value={checkoutForm.phone} onChange={handleFormChange} error={errors.phone} placeholder="+961 XX XXX XXX" />
                  <InputField label="Delivery Address *" name="address" value={checkoutForm.address} onChange={handleFormChange} error={errors.address} placeholder="123 Main St, City" />
                </div>
                <InputField label="Special Instructions" name="notes" value={checkoutForm.notes} onChange={handleFormChange} placeholder="Any notes for your order?" tag="textarea" />

                <div className="payment-section">
                  <h3>Payment Method</h3>
                  <div className="payment-options">
                    {[
                      { id: 'card', icon: '💳', label: 'Credit / Debit Card' },
                      { id: 'cash', icon: '💵', label: 'Cash on Delivery' },
                    ].map(opt => (
                      <label key={opt.id} className={`payment-option ${checkoutForm.payment === opt.id ? 'selected' : ''}`}>
                        <input type="radio" name="payment" value={opt.id} checked={checkoutForm.payment === opt.id} onChange={handleFormChange} />
                        <span className="pay-icon">{opt.icon}</span>
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="step-navigation">
                <button className="btn btn-ghost" onClick={() => setCheckoutStep(1)}>← Back to Cart</button>
                <button className="btn btn-primary" onClick={() => { if (validate()) setCheckoutStep(3); }}>Review Order →</button>
              </div>
            </div>
            <div className="cart-summary">
              <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
            </div>
          </>
        )}

        {/*STEP 3: Confirm */}
        {checkoutStep === 3 && (
          <>
            <div className="confirm-section">
              <h2>Review Your Order</h2>
              <div className="confirm-info">
                <div className="confirm-block">
                  <h4>📦 Items</h4>
                  {items.map(item => (
                    <div className="confirm-item" key={item.id}>
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="confirm-block">
                  <h4>📍 Delivery To</h4>
                  <p>{checkoutForm.name}</p>
                  <p>{checkoutForm.address}</p>
                  <p>{checkoutForm.phone}</p>
                  <p>{checkoutForm.email}</p>
                  {checkoutForm.notes && <p className="notes-text">📝 {checkoutForm.notes}</p>}
                </div>
                <div className="confirm-block">
                  <h4>💳 Payment</h4>
                  <p>{checkoutForm.payment === 'card' ? '💳 Credit / Debit Card' : '💵 Cash on Delivery'}</p>
                </div>
              </div>
              <div className="step-navigation">
                <button className="btn btn-ghost" onClick={() => setCheckoutStep(2)}>← Edit Info</button>
                <button className="btn btn-primary place-order-btn" onClick={handlePlaceOrder}>
                  🍔 Place Order — ${total.toFixed(2)}
                </button>
              </div>
            </div>
            <div className="cart-summary">
              <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// Sub-components
function OrderSummary({ subtotal, deliveryFee, total }) {
  return (
    <div className="order-summary-card">
      <h3>Order Summary</h3>
      <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
      <div className="summary-row"><span>Delivery Fee</span><span className="green">${deliveryFee.toFixed(2)}</span></div>
      <div className="summary-row"><span>Tax (10%)</span><span>${(subtotal * 0.1).toFixed(2)}</span></div>
      <div className="summary-divider" />
      <div className="summary-row grand"><span>Total</span><span className="grand-num">${(total + subtotal * 0.1).toFixed(2)}</span></div>
      <div className="delivery-note">🚚 Free delivery on orders over $25</div>
    </div>
  );
}

function InputField({ label, name, value, onChange, error, placeholder, type = 'text', tag = 'input' }) {
  return (
    <div className={`checkout-field ${error ? 'has-error' : ''}`}>
      <label>{label}</label>
      {tag === 'textarea' ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={3} className="checkout-input" />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className="checkout-input" />
      )}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
