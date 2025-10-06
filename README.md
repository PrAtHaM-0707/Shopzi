# Shopzi

Shopzi is a modern full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). It features user authentication, product management, cart and checkout, coupon system, analytics dashboard, and more.

## Features

- User authentication (signup, login, logout)
- Admin dashboard for product management and analytics
- Product listing by category and featured products
- Cart management and checkout flow with Razorpay integration
- Coupon system for discounts and rewards
- Order history and analytics
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React, Vite, Zustand, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Payments:** Razorpay
- **Image Uploads:** Cloudinary
- **Caching:** Redis (Upstash)
- **Other:** JWT authentication, REST API

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Redis (Upstash or local)
- Cloudinary account
- Razorpay account

### Installation

#### 1. Clone the repository

```sh
https://github.com/PrAtHaM-0707/Shopzi.git
cd shopzi
```

#### 2. Install dependencies

**Backend:**

```sh
cd backend
npm install
```

**Frontend:**

```sh
cd ../frontend
npm install
```

#### 3. Environment Variables

Create a `.env` file in the `backend` folder with the following:

```
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
UPSTASH_REDIS_URL=your_upstash_redis_url
NODE_ENV=development
PORT=5000
```

#### 4. Start the backend server

```sh
cd backend
npm start
```

#### 5. Start the frontend development server

```sh
cd frontend
npm run dev
```

Visit [https://shopzi-syz4.onrender.com](https://shopzi-syz4.onrender.com/)

## Folder Structure

### Backend

- `controllers/` - API route handlers
- `models/` - Mongoose models
- `routes/` - Express routes
- `middleware/` - Authentication and other middleware
- `lib/` - Utility libraries (DB, Redis, Razorpay, Cloudinary)
- `server.js` - Main Express server

### Frontend

- `src/components/` - React UI components
- `src/pages/` - Page components
- `src/stores/` - Zustand stores for state management
- `src/lib/` - Axios instance
- `src/App.jsx` - Main app component
- `src/main.jsx` - Entry point

## Usage

- **Sign Up / Login:** Create an account or log in.
- **Browse Products:** Explore categories and featured products.
- **Cart & Checkout:** Add products to cart and proceed to checkout.
- **Apply Coupons:** Use available coupons for discounts.
- **Admin Dashboard:** (Admin only) Manage products and view analytics.

## Scripts

**Frontend:**

- `npm run dev` - Start development server
- `npm run build` - Build for production

**Backend:**

- `npm start` - Start backend server

## API Endpoints

See backend `routes/` for available endpoints:

- `/api/auth` - Authentication
- `/api/products` - Product management
- `/api/cart` - Cart operations
- `/api/coupons` - Coupon system
- `/api/payments` - Payment/checkout
- `/api/analytics` - Analytics dashboard

---

**Shopzi** – Eco-friendly fashion e-commerce platform.
