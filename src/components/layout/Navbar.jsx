import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Calendar, LogOut, User, LayoutDashboard } from 'lucide-react'
import { clsx } from 'clsx'
import useAuthStore from '../../store/authStore'
import Button from '../ui/Button'
import toast from 'react-hot-toast'
import { NAV_LINKS } from '../../utils/constants'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-beige-200'
        : 'bg-transparent'
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Calendar size={16} className="text-beige-50" />
            </div>
            <span className="text-xl font-bold text-brand-800" style={{fontFamily:'Cormorant Garamond, serif'}}>
              MediBook
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === link.path
                    ? 'text-brand-600 bg-beige-100'
                    : 'text-brand-700 hover:text-brand-600 hover:bg-beige-100'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
                    <LayoutDashboard size={15} /> Dashboard
                  </Button>
                )}
                <Link
                  to="/my-appointments"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-beige-100 transition-colors"
                >
                  <img
                    src={user?.avatar || `https://i.pravatar.cc/40?u=${user?.id}`}
                    alt={user?.name}
                    className="w-7 h-7 rounded-full object-cover border border-beige-300"
                  />
                  <span className="text-sm font-medium text-brand-700">{user?.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-brand-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
                <Button size="sm" onClick={() => navigate('/register')}>Get Started</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-brand-700 hover:bg-beige-100 transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden bg-white border-t border-beige-200 py-4 px-2 space-y-1 shadow-lg rounded-b-2xl">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'text-brand-600 bg-beige-100'
                    : 'text-brand-700 hover:bg-beige-100'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-beige-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg">
                  <LogOut size={15} /> Logout
                </button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
                  <Button onClick={() => navigate('/register')}>Get Started</Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}