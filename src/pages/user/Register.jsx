import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Phone, Calendar, ArrowRight } from 'lucide-react'
import { authService } from '../../services/authService'
import useAuthStore from '../../store/authStore'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import toast from 'react-hot-toast'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const user = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        avatar: `https://i.pravatar.cc/150?u=${data.email}`,
      })
      login(user)
      toast.success('Account created! Welcome to MediBook 🎉')
      navigate('/')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-beige-100 to-brand-50 flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-800 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-700/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-600/30 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
              <Calendar size={18} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white" style={{fontFamily:'Cormorant Garamond, serif'}}>MediBook</span>
          </Link>
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-5xl font-bold text-beige-50 leading-tight" style={{fontFamily:'Cormorant Garamond, serif'}}>
            Join Thousands of
            <span className="text-brand-300 italic block">Satisfied Patients</span>
          </h2>
          <p className="text-beige-400 text-lg leading-relaxed">
            Create your free account and start booking with the world's top medical specialists today.
          </p>
          <div className="bg-brand-700/50 rounded-2xl p-6 border border-brand-600/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-2">
                {[47,33,9,68].map(n => (
                  <img key={n} src={`https://i.pravatar.cc/40?img=${n}`} className="w-9 h-9 rounded-full border-2 border-brand-700 object-cover" />
                ))}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">12,000+ patients</p>
                <p className="text-beige-400 text-xs">already trust MediBook</p>
              </div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400 text-sm">★</span>
              ))}
              <span className="text-beige-300 text-xs ml-2 mt-0.5">4.9/5 average rating</span>
            </div>
          </div>
        </div>
        <p className="relative z-10 text-beige-600 text-sm">© 2025 MediBook. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
                <Calendar size={18} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-brand-800" style={{fontFamily:'Cormorant Garamond, serif'}}>MediBook</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-beige-200 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-brand-800" style={{fontFamily:'Cormorant Garamond, serif'}}>
                Create Account
              </h1>
              <p className="text-brand-500 text-sm mt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-600 font-semibold hover:underline">Sign in</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                icon={User}
                placeholder="John Smith"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name too short' } })}
              />

              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                })}
              />

              <Input
                label="Phone Number"
                type="tel"
                icon={Phone}
                placeholder="+1 555-0100"
                error={errors.phone?.message}
                {...register('phone', { required: 'Phone is required' })}
              />

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-700">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    className={`w-full rounded-lg border bg-white pl-9 pr-10 py-2.5 text-sm text-brand-800
                      placeholder:text-brand-300 outline-none transition-all
                      border-beige-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20
                      ${errors.password ? 'border-red-400' : ''}`}
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-700">Confirm Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    className={`w-full rounded-lg border bg-white pl-9 pr-4 py-2.5 text-sm text-brand-800
                      placeholder:text-brand-300 outline-none transition-all
                      border-beige-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20
                      ${errors.confirmPassword ? 'border-red-400' : ''}`}
                    {...register('confirmPassword', {
                      required: 'Please confirm password',
                      validate: v => v === password || 'Passwords do not match'
                    })}
                  />
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  Create Account <ArrowRight size={16} />
                </Button>
              </div>

              <p className="text-xs text-center text-brand-400">
                By creating an account, you agree to our{' '}
                <span className="text-brand-600 cursor-pointer hover:underline">Terms of Service</span>
                {' '}and{' '}
                <span className="text-brand-600 cursor-pointer hover:underline">Privacy Policy</span>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}