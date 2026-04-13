'use client'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'yellow' | 'blue' | 'gray' | 'red'
  className?: string
}

export default function Badge({ children, variant = 'gray', className = '' }: BadgeProps) {
  const variants = {
    green: 'bg-green-50 text-green-700 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    gray: 'bg-[#f3f4f6] text-[#4b5563] border-[#e5e7eb]',
    red: 'bg-red-50 text-red-700 border-red-200',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
