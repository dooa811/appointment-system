export default function LoadingSpinner({ fullPage = false, text = 'Loading...' }) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-beige-50/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-beige-200 border-t-brand-500 rounded-full animate-spin" />
          <p className="text-brand-600 text-sm font-medium">{text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-beige-200 border-t-brand-500 rounded-full animate-spin" />
        <p className="text-brand-500 text-sm">{text}</p>
      </div>
    </div>
  )
}