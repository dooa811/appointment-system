import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, Briefcase, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { appointmentService } from '../../services/appointmentService'
import { authService } from '../../services/authService'
import { serviceService } from '../../services/serviceService'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { formatDate, formatTime } from '../../utils/helpers'

const MONTHLY = [
  { month: 'Jan', appointments: 32 }, { month: 'Feb', appointments: 45 },
  { month: 'Mar', appointments: 38 }, { month: 'Apr', appointments: 60 },
  { month: 'May', appointments: 55 }, { month: 'Jun', appointments: 72 },
]

const PIE_COLORS = ['#c08040', '#d4a574', '#8B5E3C', '#4A2D1A']

export default function Dashboard() {
  const [appointments, setAppointments] = useState([])
  const [users, setUsers] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      appointmentService.getAll(),
      authService.getAllUsers(),
      serviceService.getAll(),
    ]).then(([a, u, s]) => {
      setAppointments(a)
      setUsers(u)
      setServices(s)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingSpinner />

  const pending   = appointments.filter(a => a.status === 'pending').length
  const confirmed = appointments.filter(a => a.status === 'confirmed').length
  const completed = appointments.filter(a => a.status === 'completed').length
  const rejected  = appointments.filter(a => a.status === 'rejected').length

  const pieData = [
    { name: 'Confirmed', value: confirmed },
    { name: 'Pending',   value: pending   },
    { name: 'Completed', value: completed },
    { name: 'Rejected',  value: rejected  },
  ]

  const recent = [...appointments].slice(-5).reverse()

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-brand-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Dashboard Overview
        </h1>
        <p className="text-brand-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <StatCard title="Total Appointments" value={appointments.length} icon={Calendar} change={12} color="brand" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatCard title="Total Users" value={users.length} icon={Users} change={8} color="blue" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatCard title="Pending Review" value={pending} icon={Clock} color="amber" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <StatCard title="Services Offered" value={services.length} icon={Briefcase} change={5} color="green" />
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-beige-200 p-6">
          <h3 className="font-semibold text-brand-800 mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}>
            Monthly Appointments
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={MONTHLY} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e4cc" />
              <XAxis dataKey="month" tick={{ fill: '#8B5E3C', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8B5E3C', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#2D1A0E', border: 'none', borderRadius: '8px', color: '#F9F3E8', fontSize: '12px' }}
                cursor={{ fill: '#f5e6d3' }}
              />
              <Bar dataKey="appointments" fill="#c08040" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl border border-beige-200 p-6">
          <h3 className="font-semibold text-brand-800 mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}>
            Status Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                dataKey="value" paddingAngle={3}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#2D1A0E', border: 'none', borderRadius: '8px', color: '#F9F3E8', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((entry, i) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="text-xs text-brand-500 truncate">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl border border-beige-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-brand-800"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}>
            Recent Appointments
          </h3>
          <span className="text-xs text-brand-400">{appointments.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-beige-100">
                {['ID', 'Date', 'Time', 'Service', 'Status'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-50">
              {recent.map(appt => (
                <tr key={appt.id} className="hover:bg-beige-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-brand-400">#{appt.id}</td>
                  <td className="py-3 px-4 text-sm text-brand-700">{formatDate(appt.date)}</td>
                  <td className="py-3 px-4 text-sm text-brand-500">{formatTime(appt.time)}</td>
                  <td className="py-3 px-4 text-sm text-brand-700">Service #{appt.serviceId}</td>
                  <td className="py-3 px-4"><Badge status={appt.status} label={appt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}