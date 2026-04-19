import { clsx } from 'clsx'

export default function StatCard({ title, value, icon: Icon, change, color = 'brand' }) {
  const colors = {
    brand:  { bg: 'bg-brand-500',  light: 'bg-brand-50',  text: 'text-brand-600'  },
    green:  { bg: 'bg-green-500',  light: 'bg-green-50',  text: 'text-green-600'  },
    amber:  { bg: 'bg-amber-500',  light: 'bg-amber-50',  text: 'text-amber-600'  },
    blue:   { bg: 'bg-blue-500',   light: 'bg-blue-50',   text: 'text-blue-600'   },
  }
  const c = colors[color] || colors.brand

  return (
    <div className="bg-white rounded-2xl border border-beige-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-brand-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-brand-800 mt-1" style={{fontFamily:'Cormorant Garamond, serif'}}>
            {value}
          </p>
          {change && (
            <p className={clsx('text-xs mt-2 font-medium', change > 0 ? 'text-green-600' : 'text-red-500')}>
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center', c.light)}>
          {Icon && <Icon size={22} className={c.text} />}
        </div>
      </div>
    </div>
  )
}