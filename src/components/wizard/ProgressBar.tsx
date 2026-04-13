'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
  sectionName: string
  percent: number
}

export default function ProgressBar({ current, total, sectionName, percent }: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-[#6b7280] uppercase tracking-wide">
            Section {current} of {total}
          </span>
          <span className="text-sm font-semibold text-[#111827] mt-0.5">{sectionName}</span>
        </div>
        <span className="text-sm font-bold text-[#3b5bdb]">{percent}%</span>
      </div>
      <div className="h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#3b5bdb] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
