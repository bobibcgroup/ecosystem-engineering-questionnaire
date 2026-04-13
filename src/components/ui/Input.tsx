'use client'

import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[#374151]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111827] placeholder:text-[#9ca3af] bg-white transition-all
            focus:outline-none focus:ring-2 focus:ring-[#3b5bdb] focus:border-transparent
            ${error ? 'border-red-400' : 'border-[#e5e7eb]'}
            ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {helper && !error && <p className="text-xs text-[#6b7280]">{helper}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
