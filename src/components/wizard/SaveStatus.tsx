'use client'

import type { SaveStatus as SaveStatusType } from '@/types'

interface SaveStatusProps {
  status: SaveStatusType
}

export default function SaveStatus({ status }: SaveStatusProps) {
  if (status === 'idle') return null

  const config = {
    saving: { dot: 'bg-yellow-400 animate-pulse', text: 'Saving...', color: 'text-[#6b7280]' },
    saved: { dot: 'bg-green-500', text: 'Saved', color: 'text-green-600' },
    error: { dot: 'bg-red-500', text: 'Error saving', color: 'text-red-500' },
  }

  const { dot, text, color } = config[status]

  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium ${color}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot}`} />
      {text}
    </div>
  )
}
