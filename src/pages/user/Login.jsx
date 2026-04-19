import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Calendar, ArrowRight } from 'lucide-react'
import { authService } from '../../services/authService'
import useAuthStore from '../../store/authStore'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import toast from 'react-hot-toast'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const user = await authService.login(data.email, data.password)
      login(user)
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`)
      navigate(user.role === 'admin' ? '/admin' : '/')
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
            Welcome Back to
            <span className="text-brand-300 italic block">Your Health Hub</span>
          </h2>
          <p className="text-beige-400 text-lg leading-relaxed">
            Sign in to manage your appointments, connect with doctors, and take control of your wellness journey.
          </p>
          <div className="space-y-4 pt-4">
            {[
              'Access your appointment history',
              'Book new appointments instantly',
              'Connect with top specialists',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-beige-300">
                <div className="w-5 h-5 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-beige-600 text-sm">© 2025 MediBook. All rights reserved.</p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
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
                Sign In
              </h1>
              <p className="text-brand-500 text-sm mt-2">
                Don't have an account?{' '}
                <Link to="/register" className="text-brand-600 font-semibold hover:underline">Create one free</Link>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="bg-beige-50 border border-beige-200 rounded-xl p-4 mb-6 text-sm">
              <p className="font-semibold text-brand-700 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-brand-500">
                <p><span className="font-medium text-brand-700">Admin:</span> sarah@example.com / password123</p>
                <p><span className="font-medium text-brand-700">User:</span> michael@example.com / password123</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-700">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={`w-full rounded-lg border bg-white pl-9 pr-10 py-2.5 text-sm text-brand-800
                      placeholder:text-brand-300 outline-none transition-all duration-200
                      border-beige-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20
                      ${errors.password ? 'border-red-400' : ''}`}
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Sign In <ArrowRight size={16} />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}