import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, DollarSign, ArrowRight, Search } from 'lucide-react'
import { serviceService } from '../../services/serviceService'
import Button from '../../components/ui/Button'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } })
}

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    serviceService.getAll().then(data => {
      setServices(data)
      setLoading(false)
    })
  }, [])

  const categories = ['All', ...new Set(services.map(s => s.category))]

  const filtered = services.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || s.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-beige-50 pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-brand-300 font-medium text-sm uppercase tracking-widest mb-3">
            What We Offer
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold text-beige-50 mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Medical Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-beige-400 text-lg max-w-2xl mx-auto mb-10">
            Comprehensive healthcare services delivered by world-class specialists
          </motion.p>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-lg mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/20
                text-white placeholder:text-beige-400 outline-none focus:bg-white/15 transition-all text-sm"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <div className="sticky top-16 z-30 bg-white border-b border-beige-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                  ${activeCategory === cat
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'bg-beige-100 text-brand-600 hover:bg-beige-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? <LoadingSpinner /> : (
          <>
            <p className="text-brand-500 text-sm mb-8">{filtered.length} services found</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service, i) => (
                <motion.div key={service.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i}
                  className="group bg-white rounded-2xl border border-beige-200 p-8
                    hover:border-brand-300 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center
                      group-hover:bg-brand-500 transition-colors duration-300">
                      <DollarSign size={24} className="text-brand-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-medium bg-beige-100 text-brand-600 px-3 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-brand-800 mb-3"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {service.name}
                  </h3>
                  <p className="text-brand-500 text-sm leading-relaxed mb-6">{service.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-beige-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-brand-500">
                        <Clock size={14} />
                        <span className="text-sm">{service.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-brand-600 font-semibold">
                        <span className="text-lg">${service.price}</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => navigate('/booking')}>
                      Book <ArrowRight size={14} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-brand-400">
                <p className="text-2xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>No services found</p>
                <p className="text-sm">Try a different search term or category</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA */}
      <section className="bg-brand-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-beige-50 mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Ready to Get Started?
          </h2>
          <p className="text-beige-400 mb-8">Book your appointment today and take the first step toward better health.</p>
          <Button size="lg" onClick={() => navigate('/booking')}
            className="bg-beige-100 text-brand-800 hover:bg-white">
            Book Appointment <ArrowRight size={18} />
          </Button>
        </div>
      </section>
    </div>
  )
}