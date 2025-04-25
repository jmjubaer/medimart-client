# MediMart 💊 | B4A6V4

**Live Site**: [https://medimart-rose.vercel.app/](https://medimart-rose.vercel.app/)

## 🛒 Medicine E-Commerce Shop - Project Overview

MediMart is an online platform dedicated to selling medicines. It provides users with a seamless shopping experience, secure authentication, and order tracking. The platform ensures prescription compliance for medicine purchases and supports full admin control over operations.

---

## 🔑 Key Features

### 👥 User Authentication
- Custom login system for users and admins (email/phone & password)
- Secure JWT-based authentication
- Password hashing with `bcryptjs`

### 👤 User Roles
- **Customer**: Browse, search, add to cart, checkout
- **Admin**: Manage medicines, orders, users, and prescriptions

### 💊 Medicine Listings & Search
- Search by name, category, or symptoms
- Each medicine has:
  - Name, Description, Price
  - Stock availability
  - Required Prescription (Yes/No)
  - Manufacturer Details
  - Expiry Date

### 🛒 Cart & Checkout
- Add/remove/update items in cart
- Upload prescription if required
- Secure checkout with payment options (Stripe, ShurjoPay, etc.)

### 🚚 Order Management & Tracking
- Order tracking: Pending → Processing → Shipped → Delivered
- Admin updates order statuses
- Email notifications for order updates

### 🧑‍💼 Admin Dashboard
- **Manage Medicines**: Add/update/delete, monitor inventory
- **Manage Orders**: View, verify prescriptions, process orders
- **Manage Users**: View user info and order history
- **Manage Payments**: Track transactions

### 🔒 Security & Compliance
- Role-based access control
- Mandatory prescription verification for certain drugs

---

## 🛠️ Tech Stack

### Frontend
- **Next.js**
- **TypeScript**
- **React**
- **Tailwind CSS** (or any other framework)

### Backend
- **Node.js** + **Express**
- **MongoDB** (via Mongoose)
- **JWT** for authentication
- **bcryptjs** for password hashing

---

## 🧭 Frontend Pages

### Routes for Customers

- `/` – Home Page  
  → Branding, search bar, featured medicines, latest reviews, footer

- `/register` – Register Page  
  → Create a new user account

- `/login` – Login Page  
  → Login using email and password

- `/shop` – Shop Page  
  → All medicines with filters & infinite scroll

- `/medicine/:id` – Medicine Details Page  
  → View detailed medicine info + add to cart

- `/cart` – Cart Page  
  → View/edit cart, proceed to checkout

- `/checkout` – Checkout Page  
  → Shipping info, prescription upload, payment

- `/orders` – Order History  
  → View and track past/current orders

- `/profile` – User Profile  
  → Edit personal details

### Routes for Admin

- `/admin` – Dashboard  
  → Overview of orders, stocks, prescriptions

- `/admin/medicines` – Manage Medicines  
  → Add/update/remove medicines

- `/admin/orders` – Manage Orders  
  → Process, verify prescriptions, update statuses

- `/admin/users` – Manage Users  
  → View users and their order history

---

## 🌐 Deployment

- Deployed on **Vercel**  
  Live Site: [https://medimart-rose.vercel.app/](https://medimart-rose.vercel.app/)

---

## 📌 License

This project is for educational/demo purposes. All prescription-related features are simulated and should not be used in real-world scenarios without proper medical and legal compliance.

---

## 📫 Contact

Feel free to reach out for any queries or collaboration proposals.

