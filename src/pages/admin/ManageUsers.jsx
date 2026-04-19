import { useState, useEffect } from 'react'
import { Search, Trash2, Shield, User } from 'lucide-react'
import { authService } from '../../services/authService'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'
import { formatDate, getInitials } from '../../utils/helpers'
import useAuthStore from '../../store/authStore'

export default function ManageUsers() {
  const { user: currentUser } = useAuthStore()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null })

  useEffect(() => {
    authService.getAllUsers().then(data => { setUsers(data); setLoading(false) })
  }, [])

  const handleDelete = async () => {
    try {
      await authService.deleteUser(deleteModal.id)
      setUsers(prev => prev.filter(u => u.id !== deleteModal.id))
      toast.success('User removed')
    } catch {
      toast.error('Failed to delete user')
    } finally {
      setDeleteModal({ open: false, id: null })
    }
  }

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Manage Users
        </h1>
        <p className="text-brand-500 text-sm mt-1">{users.length} registered users</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-beige-200 p-4">
        <div className="relative max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-beige-200 text-sm text-brand-800
              placeholder:text-brand-300 outline-none focus:border-brand-400 transition-all" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-beige-50 border-b border-beige-200">
              <tr>
                {['User', 'Email', 'Phone', 'Role', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="text-left py-4 px-5 text-xs font-semibold text-brand-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-beige-50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      {u.avatar ? (
                        <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600">
                          {getInitials(u.name)}
                        </div>
                      )}
                      <p className="text-sm font-medium text-brand-800">{u.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-brand-500">{u.email}</td>
                  <td className="py-4 px-5 text-sm text-brand-500">{u.phone || '—'}</td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                      ${u.role === 'admin'
                        ? 'bg-brand-100 text-brand-700 border border-brand-200'
                        : 'bg-beige-100 text-brand-600 border border-beige-200'}`}>
                      {u.role === 'admin' ? <Shield size={10} /> : <User size={10} />}
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-brand-400">{formatDate(u.createdAt)}</td>
                  <td className="py-4 px-5">
                    {u.id !== currentUser?.id ? (
                      <button onClick={() => setDeleteModal({ open: true, id: u.id })}
                        className="p-1.5 rounded-lg text-brand-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    ) : (
                      <span className="text-xs text-brand-300">You</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-brand-400">
              <p className="text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>No users found</p>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={deleteModal.open} onClose={() => setDeleteModal({ open: false, id: null })}
        title="Remove User" size="sm">
        <p className="text-brand-600 mb-6">This will permanently delete the user account and all their data.</p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setDeleteModal({ open: false, id: null })}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={handleDelete}>Delete User</Button>
        </div>
      </Modal>
    </div>
  )
}