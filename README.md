# 🍔 BurgerHub — Phase 2

> The best burger restaurant website in town. 
> A modern, responsive, full-featured React frontend web application.

---

## 📸 Screenshots

> *(Replace these placeholders after deployment)*

| Home Page | Menu Page |
|-----------|-----------|
| ![Home](screenshots/home.png) | ![Menu](screenshots/menu.png) |

| Cart Page | Contact Page |
|-----------|--------------|
| ![Cart](screenshots/cart.png) | ![Contact](screenshots/contact.png) |

---x`

## 🚀 Live Demo

🌐 **[burgerhub-phase2.vercel.app](https://burgerhub-phase2.vercel.app)**  
*(Update this link after deployment)*

---

## 📋 Project Overview

(BurgerHub) is a full-featured restaurant web application built with React.js as the frontend only (no backend). This is (Phase 2) of the university project, converting the original HTML/CSS/JS Phase 1 into a complete React application with routing, state management, and professional UI/UX.

---

### 🎯 What's New in Phase 2

 Feature => Phase 1 => Phase 2 
     Technology : HTML + CSS + JS => React.js + React Router.
     Pages : 2 (landing + menu) => 5+ pages.
     State Management :  JS => React Context + useReducer.
     Navigation : links => React Router v6
     Cart : Basic modal => Full Cart Page + Drawer.
     Responsiveness : Basic => Mobile-first, fully responsive.
     Animations : CSS only => CSS + React state animations.
     Checkout : None => 3-step checkout flow.

---

## 🗂️ Project Structure

```
src/
=> components/          # Reusable UI components
    => Navbar.jsx       # Sticky responsive navbar
    => Navbar.css
    => Footer.jsx       # Full footer with links
    => Footer.css
    => MenuCard.jsx     # Food item card with add-to-cart
    => MenuCard.css
    => CartDrawer.jsx   # Slide-in cart panel
    => CartDrawer.css

=> pages/               # Route-level page components
    => Home.jsx         # Landing page
    => Home.css
    => Menu.jsx         # Full menu with filtering
    => Menu.css
    => About.jsx        # About, team, timeline
    => About.css
    => Contact.jsx      # Contact form + FAQ
    => Contact.css
    => Cart.jsx         # 3-step checkout
    => Cart.css
    => NotFound.jsx     # 404 page
    => NotFound.css

=> layouts/
   =>MainLayout.jsx   # Shared layout wrapper

 routes/
   =>AppRouter.jsx    # React Router configuration

 hooks/
   =>useCart.js       # Cart context + useReducer
   =>useScrollReveal.js

 data/
   =>menuData.js      # All menu items + content data

 index.js             # App entry point

 index.css            # Global styles + CSS variables


---

## ⚙️ Tech Stack

 Technology | Version | Purpose 
    React : 18.2 => UI framework .
    React Router :  6.22 => Client-side routing .
    React Context API : built-in => Global cart state .
    CSS Variables : native => Theming & design tokens .
    Google Fonts : CDN => Bebas Neue + Poppins + DM Sans.
    Intersection Observer : native => Scroll animations .

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/burgerhub-phase2.git
cd burgerhub-phase2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm start
```

The app will open at **http://localhost:3000**

### 4. Build for production
```bash
npm run build
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** → Import your repository
4. Leave all settings as default (Vercel auto-detects React)
5. Click **"Deploy"**

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) → "New site from Git"
3. Connect your repository
4. Build command: `npm run build`
5. Publish directory: `build`
6. Click **"Deploy site"**

---

## 📄 Pages

 Page => Route => Description .
    🏠 Home => `/` => Hero, popular items, stats, testimonials .
    🍔 Menu => `/menu` => Full menu with search + category filter .
    📖 About => `/about` => Story, timeline, team, values .
    📬 Contact => `/contact` => Form, map, FAQ, social links .
    🛒 Cart => `/cart` => 3-step checkout with order confirmation .
    ❌ 404 => `/*` => Custom not found page .

---

## 🎨 Design System

 Token => Value 
    Primary Color => `#ff6b35` (Orange) .
    Background => `#0a0a0a` (Near Black).
    Card Background => `#111111` .
    Display Font => Bebas Neue .
    Body Font => Poppins .
    UI Font => DM Sans .

---

## 👨‍💻 Author

**Issa Al Hussein**  
Student ID: 32330094  
Lebanese International University (LIU)  
Email: 32330094@students.liu.edu.lb

---

## 📝 License

This project was created for educational purposes as part of a university frontend development course.
