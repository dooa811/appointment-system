import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Calendar, Clock, User, FileText, CheckCircle } from 'lucide-react'
import { serviceService } from '../../services/serviceService'
import { appointmentService } from '../../services/appointmentService'
import useAuthStore from '../../store/authStore'
import Button from '../../components/ui/Button'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'
import { TIME_SLOTS } from '../../utils/constants'

const STEPS = ['Service', 'Doctor', 'Date & Time', 'Confirm']

export default function Booking() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()
  const [step, setStep] = useState(0)
  const [services, setServices] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selected, setSelected] = useState({
    service: null, doctor: null, date: '', time: ''
  })
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return }
    Promise.all([serviceService.getAll(), serviceService.getAllDoctors()])
      .then(([s, d]) => { setServices(s); setDoctors(d); setLoading(false) })
  }, [isAuthenticated])

  const filteredDoctors = selected.service
    ? doctors.filter(d => d.serviceId === selected.service.id)
    : doctors

  const onSubmit = async (data) => {
    if (!selected.service || !selected.doctor || !selected.date || !selected.time) {
      toast.error('Please complete all steps')
      return
    }
    setSubmitting(true)
    try {
      await appointmentService.create({
        userId: user.id,
        doctorId: selected.doctor.id,
        serviceId: selected.service.id,
        date: selected.date,
        time: selected.time,
        notes: data.notes || '',
      })
      toast.success('Appointment booked successfully! 🎉')
      navigate('/my-appointments')
    } catch {
      toast.error('Failed to book appointment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  if (loading) return <div className="pt-20"><LoadingSpinner /></div>

  return (
    <div className="min-h-screen bg-beige-50 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-beige-50 mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Book an Appointment
          </h1>
          <p className="text-beige-400">Complete the steps below to schedule your visit</p>
        </div>
      </section>

      {/* Stepper */}
      <div className="bg-white border-b border-beige-200 sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                    ${i < step ? 'bg-brand-500 text-white'
                      : i === step ? 'bg-brand-500 text-white ring-4 ring-brand-200'
                      : 'bg-beige-200 text-brand-400'}`}>
                    {i < step ? <CheckCircle size={16} /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block
                    ${i <= step ? 'text-brand-700' : 'text-brand-300'}`}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 transition-all
                    ${i < step ? 'bg-brand-500' : 'bg-beige-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <motion.div key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}>

          {/* STEP 0 — Select Service */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-brand-800 mb-6"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Choose a Service
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map(s => (
                  <button key={s.id} onClick={() => setSelected(p => ({ ...p, service: s, doctor: null }))}
                    className={`text-left p-6 rounded-2xl border-2 transition-all duration-200
                      ${selected.service?.id === s.id
                        ? 'border-brand-500 bg-brand-50 shadow-md'
                        : 'border-beige-200 bg-white hover:border-brand-300 hover:shadow-sm'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-brand-800"
                        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}>
                        {s.name}
                      </h3>
                      {selected.service?.id === s.id && (
                        <CheckCircle size={20} className="text-brand-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-brand-500 mb-4 leading-relaxed">{s.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-brand-500">
                        <Clock size={13} /> {s.duration} min
                      </span>
                      <span className="font-semibold text-brand-700">${s.price}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <Button disabled={!selected.service} onClick={() => setStep(1)} size="lg">
                  Next: Choose Doctor
                </Button>
              </div>
            </div>
          )}

          {/* STEP 1 — Select Doctor */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-brand-800 mb-6"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Choose Your Doctor
              </h2>
              {filteredDoctors.length === 0 ? (
                <div className="text-center py-16 text-brand-400">
                  <p className="text-xl mb-2">No doctors available for this service</p>
                  <Button variant="outline" onClick={() => setStep(0)}>Go Back</Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredDoctors.map(doc => (
                    <button key={doc.id} onClick={() => setSelected(p => ({ ...p, doctor: doc }))}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4
                        ${selected.doctor?.id === doc.id
                          ? 'border-brand-500 bg-brand-50 shadow-md'
                          : 'border-beige-200 bg-white hover:border-brand-300'}`}>
                      <img src={doc.avatar} alt={doc.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-brand-800 truncate"
                            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '17px' }}>
                            {doc.name}
                          </h3>
                          {selected.doctor?.id === doc.id && (
                            <CheckCircle size={18} className="text-brand-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-brand-500">{doc.specialty}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-amber-400 text-xs">★</span>
                          <span className="text-xs text-brand-600 font-medium">{doc.rating}</span>
                          <span className="text-xs text-brand-400">· {doc.experience} yrs exp</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(0)} size="lg">Back</Button>
                <Button disabled={!selected.doctor} onClick={() => setStep(2)} size="lg">
                  Next: Pick Date & Time
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2 — Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-brand-800 mb-6"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Select Date & Time
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Date */}
                <div className="bg-white rounded-2xl border border-beige-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={18} className="text-brand-500" />
                    <h3 className="font-semibold text-brand-800">Choose Date</h3>
                  </div>
                  <input
                    type="date"
                    min={today}
                    value={selected.date}
                    onChange={e => setSelected(p => ({ ...p, date: e.target.value }))}
                    className="w-full border border-beige-300 rounded-xl px-4 py-3 text-brand-800
                      outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all"
                  />
                </div>
                {/* Time */}
                <div className="bg-white rounded-2xl border border-beige-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-brand-500" />
                    <h3 className="font-semibold text-brand-800">Choose Time</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map(slot => (
                      <button key={slot} onClick={() => setSelected(p => ({ ...p, time: slot }))}
                        className={`py-2.5 rounded-lg text-sm font-medium transition-all
                          ${selected.time === slot
                            ? 'bg-brand-500 text-white shadow-md'
                            : 'bg-beige-100 text-brand-600 hover:bg-beige-200'}`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(1)} size="lg">Back</Button>
                <Button disabled={!selected.date || !selected.time} onClick={() => setStep(3)} size="lg">
                  Next: Confirm
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3 — Confirm */}
          {step === 3 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-bold text-brand-800 mb-6"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Confirm Your Appointment
              </h2>
              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-beige-200 p-8 mb-6">
                <h3 className="font-semibold text-brand-700 mb-5 text-sm uppercase tracking-wide">Booking Summary</h3>
                <div className="space-y-5">
                  {[
                    { label: 'Service',  value: selected.service?.name, sub: `$${selected.service?.price} · ${selected.service?.duration} min` },
                    { label: 'Doctor',   value: selected.doctor?.name,  sub: selected.doctor?.specialty },
                    { label: 'Date',     value: selected.date,          sub: null },
                    { label: 'Time',     value: selected.time,          sub: null },
                    { label: 'Patient',  value: user?.name,             sub: user?.email },
                  ].map(item => (
                    <div key={item.label} className="flex items-start justify-between py-3 border-b border-beige-100 last:border-0">
                      <span className="text-sm text-brand-400 font-medium">{item.label}</span>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-brand-800">{item.value}</p>
                        {item.sub && <p className="text-xs text-brand-400 mt-0.5">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Notes */}
              <div className="bg-white rounded-2xl border border-beige-200 p-6 mb-8">
                <label className="flex items-center gap-2 text-sm font-medium text-brand-700 mb-3">
                  <FileText size={15} /> Additional Notes (Optional)
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  placeholder="Any symptoms, allergies, or special requests..."
                  className="w-full border border-beige-300 rounded-xl px-4 py-3 text-sm text-brand-800
                    placeholder:text-brand-300 outline-none focus:border-brand-400 focus:ring-2
                    focus:ring-brand-400/20 transition-all resize-none"
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} size="lg" type="button">Back</Button>
                <Button type="submit" size="lg" loading={submitting}>
                  <CheckCircle size={18} /> Confirm Booking
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}