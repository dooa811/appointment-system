import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Star, Shield, Clock, Heart,
  CheckCircle, ChevronRight, Stethoscope, Brain, Smile
} from 'lucide-react'
import Button from '../../components/ui/Button'
import { serviceService } from '../../services/serviceService'
import { useState } from 'react'

import doc1 from '../../assets/images/doc1.avif';
import doc2 from '../../assets/images/doc2.avif';
import doc3 from '../../assets/images/doc3.avif';


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' }
  })
}

const STATS = [
  { value: '12K+', label: 'Patients Served' },
  { value: '98%',  label: 'Satisfaction Rate' },
  { value: '150+', label: 'Expert Doctors' },
  { value: '24/7', label: 'Support Available' },
]

const FEATURES = [
  { icon: Shield,      title: 'Verified Doctors',    desc: 'Every physician is board-certified and background-checked for your safety.' },
  { icon: Clock,       title: 'Instant Booking',     desc: 'Book your appointment in under 60 seconds, any time of day.' },
  { icon: Heart,       title: 'Personalized Care',   desc: 'Treatments and plans tailored specifically to your health needs.' },
  { icon: CheckCircle, title: 'Easy Follow-ups',     desc: 'Stay connected with your doctor through seamless follow-up visits.' },
]

const TESTIMONIALS = [
  { 
    name: 'Layla Hassan',   
    avatar: doc1, // استبدلنا الرابط بـ doc1
    rating: 5, 
    text: 'MediBook made scheduling so effortless. My doctor was amazing and the whole experience felt premium.' 
  },
  { 
    name: 'James Whitmore', 
    avatar: doc2, // استبدلنا الرابط بـ doc2
    rating: 5, 
    text: 'I booked a cardiologist in minutes. No waiting on hold, no confusion — just clean and simple.' 
  },
  { 
    name: 'Yuki Tanaka',    
    avatar: doc3, // استبدلنا الرابط بـ doc3
    rating: 5, 
    text: 'The best healthcare booking platform I\'ve used. The reminders and interface are outstanding.' 
  },
]


export default function Home() {
  const navigate = useNavigate()
  const [services, setServices] = useState([])

  useEffect(() => {
    serviceService.getAll().then(data => setServices(data.slice(0, 3)))
  }, [])

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-beige-50 via-beige-100 to-brand-50 pt-20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-beige-300/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — Text */}
            <div className="space-y-8">
              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-200 text-brand-600 px-4 py-2 rounded-full text-sm font-medium"
              >
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                Now accepting new patients
              </motion.div>

              <motion.h1
                initial="hidden" animate="visible" variants={fadeUp} custom={1}
                className="text-5xl lg:text-7xl font-bold text-brand-800 leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Your Health,
                <span className="block text-brand-500 italic">Our Priority</span>
              </motion.h1>

              <motion.p
                initial="hidden" animate="visible" variants={fadeUp} custom={2}
                className="text-lg text-brand-600 leading-relaxed max-w-lg"
              >
                Book appointments with world-class physicians in seconds. 
                MediBook connects you to the care you deserve — effortlessly.
              </motion.p>

              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={3}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" onClick={() => navigate('/booking')}>
                  Book Appointment <ArrowRight size={18} />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/doctors')}>
                  Meet Our Doctors
                </Button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={4}
                className="flex flex-wrap gap-6 pt-2"
              >
                {['HIPAA Compliant', 'SSL Secured', 'ISO Certified'].map(badge => (
                  <div key={badge} className="flex items-center gap-1.5 text-sm text-brand-500">
                    <CheckCircle size={14} className="text-brand-400" />
                    {badge}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Cards */}
            <div className="relative hidden lg:block">
              {/* Main card */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-white rounded-3xl shadow-2xl border border-beige-200 p-8 ml-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-brand-800" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'22px'}}>
                      Book an Appointment
                    </h3>
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>

                  {/* Doctor preview */}
                  {[
                    { name: 'Dr. Amara Okonkwo', specialty: 'Cardiology',    avatar: 'https://i.pravatar.cc/60?img=47', time: '10:00 AM' },
                    { name: 'Dr. James Whitfield', specialty: 'General Med', avatar: 'https://i.pravatar.cc/60?img=33', time: '02:30 PM' },
                  ].map(doc => (
                    <div key={doc.name} className="flex items-center gap-4 p-4 bg-beige-50 rounded-xl border border-beige-200">
                      <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-brand-800 text-sm truncate">{doc.name}</p>
                        <p className="text-xs text-brand-500">{doc.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-brand-600">{doc.time}</p>
                        <p className="text-xs text-green-500">Available</p>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full" onClick={() => navigate('/booking')}>
                    See All Doctors <ArrowRight size={16} />
                  </Button>
                </div>
              </motion.div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-6 -left-4 bg-brand-500 text-white rounded-2xl p-5 shadow-xl shadow-brand-500/30"
              >
                <p className="text-3xl font-bold" style={{fontFamily:'Cormorant Garamond, serif'}}>98%</p>
                <p className="text-brand-200 text-xs mt-1">Patient Satisfaction</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" className="text-amber-300" />)}
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-4 right-4 bg-white rounded-2xl p-4 shadow-lg border border-beige-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-800">Booking Confirmed</p>
                    <p className="text-xs text-brand-400">Just now</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-brand-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-bold text-beige-100" style={{fontFamily:'Cormorant Garamond, serif'}}>
                  {stat.value}
                </p>
                <p className="text-brand-400 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="text-center mb-16"
          >
            <p className="text-brand-500 font-medium text-sm uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-800" style={{fontFamily:'Cormorant Garamond, serif'}}>
              Our Specialties
            </h2>
            <p className="text-brand-500 mt-4 max-w-xl mx-auto">
              World-class care across a wide range of medical specialties, all available at your fingertips.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                onClick={() => navigate('/services')}
                className="group bg-white rounded-2xl p-8 border border-beige-200 hover:border-brand-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-500 transition-colors duration-300">
                  <Stethoscope size={24} className="text-brand-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-brand-800 mb-3" style={{fontFamily:'Cormorant Garamond, serif'}}>
                  {service.name}
                </h3>
                <p className="text-brand-500 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-600 font-semibold">${service.price}</span>
                  <span className="text-sm text-brand-400">{service.duration} min</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" onClick={() => navigate('/services')}>
              View All Services <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-brand-500 font-medium text-sm uppercase tracking-widest mb-3">Why MediBook</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-brand-800 mb-6" style={{fontFamily:'Cormorant Garamond, serif'}}>
                Healthcare Made
                <span className="text-brand-500 italic block">Simple & Trusted</span>
              </h2>
              <p className="text-brand-500 leading-relaxed mb-8">
                We combine medical excellence with modern technology to give you an experience that's as comfortable as it is effective.
              </p>
              <Button size="lg" onClick={() => navigate('/booking')}>
                Start Your Journey <ArrowRight size={18} />
              </Button>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i}
                  className="bg-beige-50 rounded-2xl p-6 border border-beige-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center mb-4">
                    <feat.icon size={20} className="text-brand-500" />
                  </div>
                  <h4 className="font-semibold text-brand-800 mb-2" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'18px'}}>
                    {feat.title}
                  </h4>
                  <p className="text-sm text-brand-500 leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-beige-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="text-center mb-16"
          >
            <p className="text-brand-500 font-medium text-sm uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-800" style={{fontFamily:'Cormorant Garamond, serif'}}>
              What Patients Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="bg-white rounded-2xl p-8 border border-beige-200 shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-brand-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-brand-800 text-sm">{t.name}</p>
                    <p className="text-xs text-brand-400">Verified Patient</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-brand-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-700/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-600/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-beige-50 mb-6" style={{fontFamily:'Cormorant Garamond, serif'}}>
              Ready to Take Control
              <span className="text-brand-300 italic block">of Your Health?</span>
            </h2>
            <p className="text-beige-400 text-lg mb-10 max-w-xl mx-auto">
              Join over 12,000 patients who trust MediBook for their healthcare journey.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/register')}
                className="bg-beige-100 text-brand-800 hover:bg-white shadow-xl">
                Create Free Account <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="ghost" onClick={() => navigate('/contact')}
                className="text-beige-300 hover:text-white hover:bg-brand-700">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}