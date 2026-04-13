'use client'

import { forwardRef, useEffect, useRef } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helper?: string
  autoResize?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helper, autoResize = true, className = '', onChange, ...props }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null)
    const resolvedRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? innerRef

    const resize = () => {
      const el = resolvedRef.current
      if (el && autoResize) {
        el.style.height = 'auto'
        el.style.height = `${el.scrollHeight}px`
      }
    }

    useEffect(() => {
      resize()
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      resize()
      onChange?.(e)
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[#374151]">{label}</label>
        )}
        <textarea
          ref={resolvedRef}
          rows={3}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111827] placeholder:text-[#9ca3af] bg-white transition-all resize-none overflow-hidden
            focus:outline-none focus:ring-2 focus:ring-[#3b5bdb] focus:border-transparent leading-relaxed
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

Textarea.displayName = 'Textarea'

export default Textarea
