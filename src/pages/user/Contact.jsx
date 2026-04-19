import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import toast from 'react-hot-toast'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } })
}

const CONTACT_INFO = [
  { icon: Phone,  label: 'Phone',    value: '+1 (555) 123-4567',       sub: 'Mon–Fri, 8am–6pm' },
  { icon: Mail,   label: 'Email',    value: 'hello@medibook.com',       sub: 'We reply within 24 hours' },
  { icon: MapPin, label: 'Address',  value: '123 Health Street',        sub: 'Medical City, CA 90210' },
  { icon: Clock,  label: 'Hours',    value: 'Mon–Sat: 8am – 8pm',      sub: 'Sunday: 10am – 4pm' },
]

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
    toast.success('Message sent! We\'ll get back to you soon.')
    reset()
  }

  return (
    <div className="min-h-screen bg-beige-50 pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-700 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold text-beige-50 mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-beige-400 text-lg max-w-xl mx-auto">
            Have a question or need help? Our team is here for you.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left — Info */}
          <div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl font-bold text-brand-800 mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                We're Here to Help
              </h2>
              <p className="text-brand-500 leading-relaxed mb-10">
                Whether you have a question about our services, need help with booking, 
                or want to give feedback — we'd love to hear from you.
              </p>
            </motion.div>

            <div className="space-y-4">
              {CONTACT_INFO.map((item, i) => (
                <motion.div key={item.label}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-beige-200 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-400 font-medium uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="font-semibold text-brand-800">{item.value}</p>
                    <p className="text-sm text-brand-400 mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <div className="bg-white rounded-3xl border border-beige-200 shadow-sm p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-800 mb-2"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Message Sent!
                  </h3>
                  <p className="text-brand-500 mb-6">We'll get back to you within 24 hours.</p>
                  <Button variant="outline" onClick={() => setSent(false)}>Send Another</Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-brand-800 mb-6"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Send a Message
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="First Name" placeholder="John"
                        error={errors.firstName?.message}
                        {...register('firstName', { required: 'Required' })} />
                      <Input label="Last Name" placeholder="Smith"
                        error={errors.lastName?.message}
                        {...register('lastName', { required: 'Required' })} />
                    </div>
                    <Input label="Email Address" type="email" icon={Mail} placeholder="you@example.com"
                      error={errors.email?.message}
                      {...register('email', {
                        required: 'Required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                      })} />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-brand-700">Subject</label>
                      <select
                        {...register('subject', { required: 'Required' })}
                        className="w-full border border-beige-300 rounded-lg px-4 py-2.5 text-sm text-brand-800
                          outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 bg-white">
                        <option value="">Select a subject...</option>
                        <option>Appointment Question</option>
                        <option>Billing & Insurance</option>
                        <option>Technical Support</option>
                        <option>General Inquiry</option>
                        <option>Feedback</option>
                      </select>
                      {errors.subject && <p className="text-xs text-red-500">Required</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-brand-700">Message</label>
                      <textarea rows={5} placeholder="How can we help you?"
                        {...register('message', { required: 'Required', minLength: { value: 10, message: 'Too short' } })}
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm text-brand-800 
                          placeholder:text-brand-300 outline-none resize-none transition-all
                          border-beige-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20
                          ${errors.message ? 'border-red-400' : ''}`} />
                      {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" className="w-full" size="lg" loading={loading}>
                      <Send size={16} /> Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}