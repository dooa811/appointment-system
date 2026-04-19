import { createBrowserRouter } from 'react-router-dom'

// Layouts
import UserLayout from './components/layout/UserLayout.jsx'
import AdminLayout from './components/layout/AdminLayout.jsx'

// User Pages
import Home from './pages/user/Home.jsx'
import Services from './pages/user/Services.jsx'
import Doctors from './pages/user/Doctors.jsx'
import Booking from './pages/user/Booking.jsx'
import MyAppointments from './pages/user/MyAppointments.jsx'
import Login from './pages/user/Login.jsx'
import Register from './pages/user/Register.jsx'
import Contact from './pages/user/Contact.jsx'

// Admin Pages
import Dashboard from './pages/admin/Dashboard.jsx'
import Appointments from './pages/admin/Appointments.jsx'
import ManageServices from './pages/admin/ManageServices.jsx'
import ManageUsers from './pages/admin/ManageUsers.jsx'
import Calendar from './pages/admin/Calendar.jsx'

export const router = createBrowserRouter([
  // ── User Routes ──
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'doctors', element: <Doctors /> },
      { path: 'booking', element: <Booking /> },
      { path: 'my-appointments', element: <MyAppointments /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  // ── Admin Routes ──
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'services', element: <ManageServices /> },
      { path: 'users', element: <ManageUsers /> },
      { path: 'calendar', element: <Calendar /> },
    ],
  },
])