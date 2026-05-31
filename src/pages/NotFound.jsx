// 404 Not Found Page

import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="notfound-page page-enter">
      <div className="notfound-content">
        <div className="notfound-emoji">🍔</div>
        <h1 className="notfound-404">404</h1>
        <h2>Oops! This page got eaten.</h2>
        <p>Looks like this burger rolled off the plate. The page you're looking for doesn't exist.</p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">🏠 Go Home</Link>
          <Link to="/menu" className="btn btn-secondary">🍔 Browse Menu</Link>
        </div>
      </div>
    </main>
  );
}
