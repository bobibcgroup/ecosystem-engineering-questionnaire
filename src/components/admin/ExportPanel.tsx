'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { Download, Copy, CheckCircle2 } from 'lucide-react'

export default function ExportPanel() {
  const [copied, setCopied] = useState(false)

  const handleExport = (format: 'csv' | 'json') => {
    window.open(`/api/admin/export?format=${format}`, '_blank')
  }

  const handleCopyAll = async () => {
    try {
      const res = await fetch('/api/admin/export?format=json')
      const text = await res.text()
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard not available
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="ghost" size="sm" onClick={() => handleExport('csv')} className="flex items-center gap-2">
        <Download size={14} />
        Export CSV
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleExport('json')} className="flex items-center gap-2">
        <Download size={14} />
        Export JSON
      </Button>
      <Button variant="ghost" size="sm" onClick={handleCopyAll} className="flex items-center gap-2">
        {copied ? <CheckCircle2 size={14} className="text-green-600" /> : <Copy size={14} />}
        {copied ? 'Copied!' : 'Copy All'}
      </Button>
    </div>
  )
}
