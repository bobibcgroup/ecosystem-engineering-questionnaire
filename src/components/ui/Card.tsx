'use client'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export default function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' }
  return (
    <div className={`bg-white border border-[#e5e7eb] shadow-sm rounded-2xl ${paddings[padding]} ${className}`}>
      {children}
    </div>
  )
}
