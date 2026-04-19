import { clsx } from 'clsx'
import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-brand-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400">
            <Icon size={16} />
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-brand-800',
            'placeholder:text-brand-300 outline-none transition-all duration-200',
            'border-beige-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            Icon && 'pl-9',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input