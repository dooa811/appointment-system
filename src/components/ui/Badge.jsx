import { clsx } from 'clsx'

const variants = {
  pending:   'bg-amber-100 text-amber-700 border border-amber-200',
  confirmed: 'bg-green-100 text-green-700 border border-green-200',
  rejected:  'bg-red-100 text-red-600 border border-red-200',
  completed: 'bg-blue-100 text-blue-700 border border-blue-200',
  default:   'bg-beige-200 text-brand-600 border border-beige-300',
}

export default function Badge({ label, status = 'default', className = '' }) {
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize',
      variants[status] || variants.default,
      className
    )}>
      <span className={clsx(
        'w-1.5 h-1.5 rounded-full',
        status === 'pending'   && 'bg-amber-500',
        status === 'confirmed' && 'bg-green-500',
        status === 'rejected'  && 'bg-red-500',
        status === 'completed' && 'bg-blue-500',
        !['pending','confirmed','rejected','completed'].includes(status) && 'bg-brand-400',
      )} />
      {label || status}
    </span>
  )
}