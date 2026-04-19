import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { appointmentService } from '../../services/appointmentService'
import { serviceService } from '../../services/serviceService'
import Badge from '../../components/ui/Badge'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { formatTime } from '../../utils/helpers'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function Calendar() {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(new Date())
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    Promise.all([appointmentService.getAll(), serviceService.getAllDoctors()])
      .then(([a, d]) => { setAppointments(a); setDoctors(d); setLoading(false) })
  }, [])

  const year  = current.getFullYear()
  const month = current.getMonth()

  const firstDay   = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const getAppts = (day) => {
    if (!day) return []
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return appointments.filter(a => a.date === dateStr)
  }

  const selectedAppts = selected ? getAppts(selected) : []
  const getDoctor = id => doctors.find(d => d.id === id)

  const today = new Date()
  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Booking Calendar
        </h1>
        <p className="text-brand-500 text-sm mt-1">View all appointments by date</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-beige-200 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-brand-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {MONTHS[month]} {year}
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrent(new Date(year, month - 1))}
                className="p-2 rounded-lg hover:bg-beige-100 text-brand-600 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => setCurrent(new Date())}
                className="px-3 py-1.5 text-xs font-medium bg-beige-100 text-brand-600 rounded-lg hover:bg-beige-200 transition-colors">
                Today
              </button>
              <button onClick={() => setCurrent(new Date(year, month + 1))}
                className="p-2 rounded-lg hover:bg-beige-100 text-brand-600 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Days header */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-brand-400 py-2">{d}</div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              const appts = getAppts(day)
              const hasAppts = appts.length > 0
              const isSelected = selected === day
              return (
                <div key={i}
                  onClick={() => day && setSelected(isSelected ? null : day)}
                  className={`min-h-[64px] rounded-xl p-1.5 transition-all
                    ${!day ? '' : 'cursor-pointer hover:bg-beige-100'}
                    ${isToday(day) ? 'bg-brand-500/10 border border-brand-300' : ''}
                    ${isSelected ? 'bg-brand-500 text-white shadow-lg' : ''}`}>
                  {day && (
                    <>
                      <p className={`text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full
                        ${isToday(day) && !isSelected ? 'bg-brand-500 text-white' : ''}
                        ${isSelected ? 'text-white' : 'text-brand-700'}`}>
                        {day}
                      </p>
                      {hasAppts && (
                        <div className="space-y-0.5">
                          {appts.slice(0, 2).map(a => (
                            <div key={a.id}
                              className={`text-[9px] px-1.5 py-0.5 rounded font-medium truncate
                                ${isSelected ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-700'}`}>
                              {formatTime(a.time)}
                            </div>
                          ))}
                          {appts.length > 2 && (
                            <p className={`text-[9px] font-medium ${isSelected ? 'text-white/70' : 'text-brand-400'}`}>
                              +{appts.length - 2} more
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar — Selected Day */}
        <div className="bg-white rounded-2xl border border-beige-200 p-6">
          <h3 className="font-semibold text-brand-800 mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}>
            {selected
              ? `${MONTHS[month]} ${selected}, ${year}`
              : 'Select a Day'}
          </h3>
          {!selected ? (
            <p className="text-sm text-brand-400">Click on a date to view appointments for that day.</p>
          ) : selectedAppts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-brand-400 text-sm">No appointments on this day</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedAppts.map(appt => {
                const doc = getDoctor(appt.doctorId)
                return (
                  <div key={appt.id}
                    className="p-4 rounded-xl border border-beige-200 hover:border-brand-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-brand-800">{formatTime(appt.time)}</span>
                      <Badge status={appt.status} label={appt.status} />
                    </div>
                    <p className="text-xs text-brand-600">{doc?.name || 'Doctor'}</p>
                    <p className="text-xs text-brand-400">{doc?.specialty}</p>
                    {appt.notes && (
                      <p className="text-xs text-brand-400 mt-2 italic border-t border-beige-100 pt-2">
                        "{appt.notes}"
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}