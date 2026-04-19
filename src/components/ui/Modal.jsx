import { useEffect } from 'react'
import { X } from 'lucide-react'
import Button from './Button'

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className={`relative w-full ${sizes[size]} bg-white rounded-2xl shadow-2xl border border-beige-200 animate-in`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-beige-100">
          <h3 className="text-xl font-semibold text-brand-800" style={{fontFamily:'Cormorant Garamond, serif'}}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-400 hover:text-brand-700 hover:bg-beige-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}