'use client'

import { motion } from 'framer-motion'
import Textarea from '@/components/ui/Textarea'
import type { Question } from '@/types'

interface QuestionFieldProps {
  question: Question
  value: string
  onChange: (key: string, value: string) => void
  index: number
}

export default function QuestionField({ question, value, onChange, index }: QuestionFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e0e9ff] text-[#3b5bdb] text-xs font-bold flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#111827] leading-snug">
            {question.label}
          </label>
          {question.helper && (
            <p className="text-xs text-[#9ca3af] leading-relaxed">{question.helper}</p>
          )}
          <Textarea
            value={value}
            onChange={(e) => onChange(question.key, e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            autoResize
          />
        </div>
      </div>
    </motion.div>
  )
}
