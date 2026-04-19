import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Plus, Trash2 } from 'lucide-react'
import { appointmentService } from '../../services/appointmentService'
import { serviceService } from '../../services/serviceService'
import useAuthStore from '../../store/authStore'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'
import { formatDate, formatTime } from '../../utils/helpers'

export default function MyAppointments() {
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null })

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return }
    loadData()
  }, [isAuthenticated])

  const loadData = async () => {
    try {
      const [appts, docs, svcs] = await Promise.all([
        appointmentService.getByUser(user.id),
        serviceService.getAllDoctors(),
        serviceService.getAll(),
      ])
      setAppointments(appts)
      setDoctors(docs)
      setServices(svcs)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await appointmentService.delete(deleteModal.id)
      setAppointments(prev => prev.filter(a => a.id !== deleteModal.id))
      toast.success('Appointment cancelled')
    } catch {
      toast.error('Failed to cancel appointment')
    } finally {
      setDeleteModal({ open: false, id: null })
    }
  }

  const getDoctor = id => doctors.find(d => d.id === id)
  const getService = id => services.find(s => s.id === id)

  const filtered = appointments.filter(a =>
    activeTab === 'all' ? true : a.status === activeTab
  )

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'completed', label: 'Completed' },
    { key: 'rejected', label: 'Rejected' },
  ]

  if (loading) return <div className="pt-20"><LoadingSpinner /></div>

  return (
    <div className="min-h-screen bg-beige-50 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-700 py-16">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-beige-50 mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              My Appointments
            </h1>
            <p className="text-beige-400">Manage all your healthcare appointments</p>
          </div>
          <Button onClick={() => navigate('/booking')}
            className="bg-beige-100 text-brand-800 hover:bg-white shrink-0">
            <Plus size={16} /> Book New
          </Button>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', count: appointments.length, color: 'bg-brand-500' },
            { label: 'Pending', count: appointments.filter(a => a.status === 'pending').length, color: 'bg-amber-500' },
            { label: 'Confirmed', count: appointments.filter(a => a.status === 'confirmed').length, color: 'bg-green-500' },
            { label: 'Completed', count: appointments.filter(a => a.status === 'completed').length, color: 'bg-blue-500' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-beige-200 p-5">
              <div className={`w-2 h-2 rounded-full ${stat.color} mb-3`} />
              <p className="text-2xl font-bold text-brand-800"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {stat.count}
              </p>
              <p className="text-sm text-brand-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                ${activeTab === tab.key
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'bg-white text-brand-600 border border-beige-200 hover:bg-beige-100'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-beige-200">
            <Calendar size={48} className="text-beige-300 mx-auto mb-4" />
            <p className="text-xl text-brand-600 mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              No appointments found
            </p>
            <p className="text-brand-400 text-sm mb-6">Book your first appointment to get started</p>
            <Button onClick={() => navigate('/booking')}>Book Now</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((appt, i) => {
              const doc = getDoctor(appt.doctorId)
              const svc = getService(appt.serviceId)
              return (
                <motion.div key={appt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-beige-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Doctor info */}
                    <img
                      src={doc?.avatar || `https://i.pravatar.cc/60?u=${appt.doctorId}`}
                      alt={doc?.name}
                      className="w-14 h-14 rounded-xl object-cover border border-beige-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-brand-800"
                          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}>
                          {doc?.name || 'Doctor'}
                        </h3>
                        <Badge status={appt.status} label={appt.status} />
                      </div>
                      <p className="text-sm text-brand-500 mb-2">{svc?.name || 'Service'}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-brand-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} /> {formatDate(appt.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} /> {formatTime(appt.time)}
                        </span>
                      </div>
                      {appt.notes && (
                        <p className="text-xs text-brand-400 mt-2 italic">"{appt.notes}"</p>
                      )}
                    </div>
                    {/* Price & Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                      <p className="text-xl font-bold text-brand-700"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        ${svc?.price || '—'}
                      </p>
                      {appt.status === 'pending' && (
                        <button
                          onClick={() => setDeleteModal({ open: true, id: appt.id })}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal.open} onClose={() => setDeleteModal({ open: false, id: null })}
        title="Cancel Appointment" size="sm">
        <p className="text-brand-600 mb-6">Are you sure you want to cancel this appointment? This action cannot be undone.</p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1"
            onClick={() => setDeleteModal({ open: false, id: null })}>
            Keep It
          </Button>
          <Button variant="danger" className="flex-1" onClick={handleDelete}>
            Yes, Cancel
          </Button>
        </div>
      </Modal>
    </div>
  )
}