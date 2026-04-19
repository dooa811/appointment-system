import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Pencil, Trash2, Clock, DollarSign } from 'lucide-react'
import { serviceService } from '../../services/serviceService'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

export default function ManageServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ open: false, service: null })
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null })
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    const data = await serviceService.getAll()
    setServices(data)
    setLoading(false)
  }

  const openAdd = () => {
    reset()
    setModal({ open: true, service: null })
  }

  const openEdit = (service) => {
    Object.keys(service).forEach(k => setValue(k, service[k]))
    setModal({ open: true, service })
  }

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const payload = { ...data, price: Number(data.price), duration: Number(data.duration), available: true }
      if (modal.service) {
        const updated = await serviceService.update(modal.service.id, payload)
        setServices(prev => prev.map(s => s.id === modal.service.id ? updated : s))
        toast.success('Service updated!')
      } else {
        const created = await serviceService.create(payload)
        setServices(prev => [...prev, created])
        toast.success('Service created!')
      }
      setModal({ open: false, service: null })
    } catch {
      toast.error('Failed to save service')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await serviceService.delete(deleteModal.id)
      setServices(prev => prev.filter(s => s.id !== deleteModal.id))
      toast.success('Service deleted')
    } catch {
      toast.error('Failed to delete')
    } finally {
      setDeleteModal({ open: false, id: null })
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Manage Services
          </h1>
          <p className="text-brand-500 text-sm mt-1">{services.length} services available</p>
        </div>
        <Button onClick={openAdd}>
          <Plus size={16} /> Add Service
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map(service => (
          <div key={service.id}
            className="bg-white rounded-2xl border border-beige-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-medium bg-beige-100 text-brand-500 px-2.5 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => openEdit(service)}
                  className="p-1.5 rounded-lg text-brand-400 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => setDeleteModal({ open: true, id: service.id })}
                  className="p-1.5 rounded-lg text-brand-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-brand-800 mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}>
              {service.name}
            </h3>
            <p className="text-sm text-brand-500 leading-relaxed mb-4 line-clamp-2">{service.description}</p>
            <div className="flex items-center gap-4 pt-4 border-t border-beige-100">
              <div className="flex items-center gap-1.5 text-brand-500 text-sm">
                <Clock size={13} /> {service.duration} min
              </div>
              <div className="flex items-center gap-1.5 text-brand-700 font-semibold">
                <DollarSign size={13} /> {service.price}
              </div>
              <div className={`ml-auto w-2 h-2 rounded-full ${service.available ? 'bg-green-400' : 'bg-red-400'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={modal.open} onClose={() => setModal({ open: false, service: null })}
        title={modal.service ? 'Edit Service' : 'Add New Service'} size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Service Name" placeholder="e.g. Cardiology"
            error={errors.name?.message}
            {...register('name', { required: 'Required' })} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-700">Description</label>
            <textarea rows={3} placeholder="Service description..."
              {...register('description', { required: 'Required' })}
              className="w-full border border-beige-300 rounded-lg px-4 py-2.5 text-sm text-brand-800
                placeholder:text-brand-300 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 resize-none" />
            {errors.description && <p className="text-xs text-red-500">Required</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Duration (min)" type="number" placeholder="30"
              error={errors.duration?.message}
              {...register('duration', { required: 'Required', min: 1 })} />
            <Input label="Price ($)" type="number" placeholder="150"
              error={errors.price?.message}
              {...register('price', { required: 'Required', min: 0 })} />
          </div>
          <Input label="Category" placeholder="e.g. Specialist"
            error={errors.category?.message}
            {...register('category', { required: 'Required' })} />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" type="button" className="flex-1"
              onClick={() => setModal({ open: false, service: null })}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" loading={saving}>
              {modal.service ? 'Update' : 'Create'} Service
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal.open} onClose={() => setDeleteModal({ open: false, id: null })}
        title="Delete Service" size="sm">
        <p className="text-brand-600 mb-6">Are you sure? This will permanently remove this service.</p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setDeleteModal({ open: false, id: null })}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}