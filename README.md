# 🏥 MediBook — Advanced Appointment Booking System

A full-stack frontend application for managing medical appointments, built with React and modern web technologies.

![MediBook Preview](./preview.png)

## 🔗 Live Demo
[View Live Demo](appointment-system-three-alpha.vercel.app)

## ✨ Features

### Patient Side
- 🏠 Modern landing page with animations
- 📋 Browse medical services
- 👨‍⚕️ View doctors and specialists  
- 📅 Multi-step appointment booking
- 🗂️ Manage personal appointments
- 🔐 Authentication (Login / Register)
- 📬 Contact form

### Admin Dashboard
- 📊 Overview with charts and statistics
- ✅ Approve / Reject appointments
- 🛠️ Full CRUD for services
- 👥 User management
- 🗓️ Interactive booking calendar

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| State | Zustand |
| Animations | Framer Motion |
| Charts | Recharts |
| Forms | React Hook Form |
| API | JSON Server (Mock REST API) |
| Notifications | React Hot Toast |
| Icons | Lucide React |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/appointment-system.git

# Enter the folder
cd appointment-system

# Install dependencies
npm install

# Start mock API (Terminal 1)
npm run api

# Start the app (Terminal 2)
npm run dev
```

### Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | sarah@example.com | password123 |
| User | michael@example.com | password123 |

## 📁 Project Structure
src/
├── components/
│   ├── ui/          # Reusable UI components
│   └── layout/      # Layout components
├── pages/
│   ├── user/        # Patient-facing pages
│   └── admin/       # Admin dashboard pages
├── services/        # API call functions
├── store/           # Zustand global state
├── hooks/           # Custom React hooks
└── utils/           # Helper functions

> ⚠️ **Note:** This project uses a local mock API (JSON Server).
> To test login functionality, clone the repo and run `npm run api` locally.
> 
> **Demo credentials:**
> - Admin: sarah@example.com / password123  
> - User: michael@example.com / password123

## 👩‍💻 Author
**Doaa Zaqout**  
Frontend Developer  
