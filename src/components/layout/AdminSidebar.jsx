import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Calendar, Briefcase, Users, CalendarDays, LogOut, X, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'
import useAuthStore from '../../store/authStore'
import toast from 'react-hot-toast'

const links = [
  { to: '/admin',              icon: LayoutDashboard, label: 'Overview'    },
  { to: '/admin/appointments', icon: Calendar,         label: 'Appointments'},
  { to: '/admin/services',     icon: Briefcase,        label: 'Services'    },
  { to: '/admin/users',        icon: Users,            label: 'Users'       },
  { to: '/admin/calendar',     icon: CalendarDays,     label: 'Calendar'    },
]

export default function AdminSidebar({ onClose }) {
  const location = useLocation()
  const navigate  = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/')
  }

  return (
    <aside className="h-full bg-brand-900 text-beige-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-brand-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <span className="font-bold text-beige-50" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'20px'}}>
            MediBook
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 text-beige-400 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="p-4 mx-4 mt-4 rounded-xl bg-brand-800 border border-brand-700">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || `https://i.pravatar.cc/40?u=${user?.id}`}
            alt={user?.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-brand-500"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-beige-50 truncate">{user?.name}</p>
            <p className="text-xs text-brand-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="text-xs text-brand-500 uppercase tracking-wider font-semibold px-3 mb-3">Menu</p>
        {links.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={clsx(
                'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                active
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                  : 'text-beige-400 hover:bg-brand-800 hover:text-beige-100'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={17} />
                {label}
              </div>
              {active && <ChevronRight size={14} />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-brand-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-beige-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}