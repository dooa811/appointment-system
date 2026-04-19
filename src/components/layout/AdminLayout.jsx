import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, Bell } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import useAuthStore from '../../store/authStore'
import { useEffect } from 'react'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login')
    }
  }, [isAuthenticated, user])

  return (
    <div className="flex h-screen bg-beige-50 overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-30"
      >
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen overflow-auto">

        {/* Top Bar */}
        <header className="bg-white border-b border-beige-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-brand-600 hover:bg-beige-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm text-brand-500">Good day,</p>
            <p className="font-semibold text-brand-800" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'18px'}}>
              {user?.name} 👋
            </p>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-lg text-brand-500 hover:bg-beige-100 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full" />
            </button>
            <img
              src={user?.avatar || `https://i.pravatar.cc/40?u=${user?.id}`}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-beige-300"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}