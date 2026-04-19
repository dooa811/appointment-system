import { clsx } from 'clsx'

const variants = {
  primary: 'bg-brand-500 hover:bg-brand-600 text-beige-50 shadow-lg hover:shadow-brand-500/25',
  secondary: 'bg-beige-200 hover:bg-beige-300 text-brand-700',
  outline: 'border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-beige-50',
  ghost: 'text-brand-600 hover:bg-beige-200',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-all duration-200 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  )
}