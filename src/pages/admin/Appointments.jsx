import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Search, Filter } from 'lucide-react'
import { appointmentService } from '../../services/appointmentService'
import { serviceService } from '../../services/serviceService'
import { authService } from '../../services/authService'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'
import { formatDate, formatTime } from '../../utils/helpers'

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [users, setUsers] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [modal, setModal] = useState({ open: false, appt: null, action: null })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [a, d, u, s] = await Promise.all([
      appointmentService.getAll(),
      serviceService.getAllDoctors(),
      authService.getAllUsers(),
      serviceService.getAll(),
    ])
    setAppointments(a); setDoctors(d); setUsers(u); setServices(s)
    setLoading(false)
  }

  const handleAction = async () => {
    try {
      const status = modal.action === 'approve' ? 'confirmed' : 'rejected'
      await appointmentService.updateStatus(modal.appt.id, status)
      setAppointments(prev => prev.map(a =>
        a.id === modal.appt.id ? { ...a, status } : a
      ))
      toast.success(`Appointment ${status}!`)
    } catch {
      toast.error('Action failed')
    } finally {
      setModal({ open: false, appt: null, action: null })
    }
  }

  const getDoctor  = id => doctors.find(d => d.id === id)
  const getUser    = id => users.find(u => u.id === id)
  const getService = id => services.find(s => s.id === id)

  const filtered = appointments.filter(a => {
    const doc  = getDoctor(a.doctorId)
    const user = getUser(a.userId)
    const matchSearch = search === '' ||
      doc?.name.toLowerCase().includes(search.toLowerCase()) ||
      user?.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || a.status === filterStatus
    return matchSearch && matchStatus
  })

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Manage Appointments
        </h1>
        <p className="text-brand-500 text-sm mt-1">Review, approve, or reject patient appointments</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-beige-200 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by doctor or patient..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-beige-200 text-sm text-brand-800
              placeholder:text-brand-300 outline-none focus:border-brand-400 transition-all" />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'rejected'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all
                ${filterStatus === s ? 'bg-brand-500 text-white' : 'bg-beige-100 text-brand-600 hover:bg-beige-200'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-beige-50 border-b border-beige-200">
              <tr>
                {['Patient', 'Doctor', 'Service', 'Date & Time', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-4 px-5 text-xs font-semibold text-brand-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-50">
              {filtered.map((appt, i) => {
                const doc  = getDoctor(appt.doctorId)
                const user = getUser(appt.userId)
                const svc  = getService(appt.serviceId)
                return (
                  <motion.tr key={appt.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-beige-50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <img src={user?.avatar || `https://i.pravatar.cc/40?u=${appt.userId}`}
                          className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-medium text-brand-800">{user?.name || 'Unknown'}</p>
                          <p className="text-xs text-brand-400">{user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <p className="text-sm font-medium text-brand-700">{doc?.name || '—'}</p>
                      <p className="text-xs text-brand-400">{doc?.specialty}</p>
                    </td>
                    <td className="py-4 px-5 text-sm text-brand-600">{svc?.name || '—'}</td>
                    <td className="py-4 px-5">
                      <p className="text-sm text-brand-700">{formatDate(appt.date)}</p>
                      <p className="text-xs text-brand-400">{formatTime(appt.time)}</p>
                    </td>
                    <td className="py-4 px-5"><Badge status={appt.status} label={appt.status} /></td>
                    <td className="py-4 px-5">
                      {appt.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button onClick={() => setModal({ open: true, appt, action: 'approve' })}
                            className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                            <Check size={14} />
                          </button>
                          <button onClick={() => setModal({ open: true, appt, action: 'reject' })}
                            className="p-1.5 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-brand-300">—</span>
                      )}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-brand-400">
              <p className="text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>No appointments found</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      <Modal isOpen={modal.open} onClose={() => setModal({ open: false, appt: null, action: null })}
        title={modal.action === 'approve' ? 'Approve Appointment' : 'Reject Appointment'} size="sm">
        <p className="text-brand-600 mb-6">
          Are you sure you want to <strong>{modal.action}</strong> this appointment?
        </p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1"
            onClick={() => setModal({ open: false, appt: null, action: null })}>
            Cancel
          </Button>
          <Button variant={modal.action === 'approve' ? 'primary' : 'danger'} className="flex-1"
            onClick={handleAction}>
            {modal.action === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}