import { clsx } from 'clsx'

export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl border border-beige-200 shadow-sm',
        hover && 'transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}