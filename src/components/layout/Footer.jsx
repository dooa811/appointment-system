import { Link } from 'react-router-dom'
import { Calendar, Phone, Mail, MapPin } from 'lucide-react'
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-brand-800 text-beige-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center">
                <Calendar size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold text-beige-50" style={{fontFamily:'Cormorant Garamond, serif'}}>
                MediBook
              </span>
            </div>
            <p className="text-sm text-beige-400 leading-relaxed">
              Your trusted healthcare appointment platform. Book with confidence, care with excellence.
            </p>
            <div className="flex gap-3">
              {[FaInstagram, FaTwitter, FaFacebook].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-brand-700 flex items-center justify-center text-beige-400 hover:bg-brand-500 hover:text-white transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-beige-50 font-semibold" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'18px'}}>Quick Links</h4>
            <ul className="space-y-2">
              {[
                {label:'Home', to:'/'},
                {label:'Services', to:'/services'},
                {label:'Our Doctors', to:'/doctors'},
                {label:'Book Appointment', to:'/booking'},
                {label:'Contact', to:'/contact'},
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-beige-400 hover:text-beige-100 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-beige-50 font-semibold" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'18px'}}>Services</h4>
            <ul className="space-y-2 text-sm text-beige-400">
              {['General Consultation','Cardiology','Dermatology','Mental Wellness','Dental Care','Physiotherapy'].map(s => (
                <li key={s} className="hover:text-beige-100 transition-colors cursor-pointer">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-beige-50 font-semibold" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'18px'}}>Contact Us</h4>
            <ul className="space-y-3">
              {[
                { Icon: Phone,  text: '+1 (555) 123-4567' },
                { Icon: Mail,   text: 'hello@medibook.com' },
                { Icon: MapPin, text: '123 Health St, Medical City' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-beige-400">
                  <Icon size={14} className="text-brand-400 mt-0.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-beige-500">
          <p>© 2025 MediBook. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-beige-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-beige-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}