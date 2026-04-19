import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Award, Calendar, Search } from 'lucide-react'
import { serviceService } from '../../services/serviceService'
import Button from '../../components/ui/Button'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } })
}

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    serviceService.getAllDoctors().then(data => {
      setDoctors(data)
      setLoading(false)
    })
  }, [])

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-beige-50 pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-brand-300 font-medium text-sm uppercase tracking-widest mb-3">
            Our Team
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold text-beige-50 mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Meet Our Specialists
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-beige-400 text-lg max-w-2xl mx-auto mb-10">
            Board-certified physicians dedicated to providing exceptional care
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-lg mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or specialty..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/20
                text-white placeholder:text-beige-400 outline-none focus:bg-white/15 transition-all text-sm"
            />
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? <LoadingSpinner /> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((doc, i) => (
              <motion.div key={doc.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="group bg-white rounded-2xl border border-beige-200 overflow-hidden
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Photo */}
                <div className="relative h-56 bg-beige-100 overflow-hidden">
                  <img src={doc.avatar} alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1.5 w-fit">
                      <Star size={12} fill="currentColor" className="text-amber-400" />
                      <span className="text-xs font-semibold text-brand-800">{doc.rating}</span>
                      <span className="text-xs text-brand-500">({doc.reviews})</span>
                    </div>
                  </div>
                  {doc.available && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500 text-white
                      text-xs font-medium px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Available
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-brand-800 text-lg mb-1"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {doc.name}
                  </h3>
                  <p className="text-brand-500 text-sm mb-3">{doc.specialty}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-brand-500 text-xs">
                      <Award size={12} className="text-brand-400" />
                      {doc.experience} yrs exp.
                    </div>
                  </div>
                  <p className="text-brand-400 text-xs leading-relaxed mb-5 line-clamp-2">{doc.bio}</p>
                  <Button className="w-full" size="sm" onClick={() => navigate('/booking')}>
                    <Calendar size={14} /> Book Appointment
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-brand-400">
            <p className="text-2xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>No doctors found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        )}
      </section>
    </div>
  )
}