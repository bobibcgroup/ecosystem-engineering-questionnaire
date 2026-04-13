'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SECTIONS } from '@/lib/questions'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Edit2, Send } from 'lucide-react'
import type { RespondentData, AnswerData } from '@/types'

const RESPONDENT_KEY = 'eq_respondent_id'

function buildAnswerMap(answers: AnswerData[]): Record<string, string> {
  return answers.reduce<Record<string, string>>((acc, a) => {
    acc[a.questionKey] = a.value
    return acc
  }, {})
}

export default function ReviewPage() {
  const { status } = useSession()
  const router = useRouter()
  const [respondent, setRespondent] = useState<RespondentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
    if (status !== 'authenticated') return

    const savedId = localStorage.getItem(RESPONDENT_KEY)
    if (!savedId) {
      router.push('/questionnaire')
      return
    }

    fetch(`/api/respondent?id=${savedId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          setRespondent(res.data as RespondentData)
        } else {
          router.push('/questionnaire')
        }
      })
      .catch(() => router.push('/questionnaire'))
      .finally(() => setLoading(false))
  }, [status, router])

  const handleSubmit = async () => {
    if (!respondent) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respondentId: respondent.id }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error ?? 'Submission failed')
      router.push('/success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!respondent) return null

  const answerMap = buildAnswerMap(respondent.answers)
  const totalQuestions = SECTIONS.reduce((s, sec) => s + sec.questions.length, 0)
  const answeredCount = Object.values(answerMap).filter((v) => v.trim().length > 0).length
  const completedSections = SECTIONS.filter((s) =>
    s.questions.every((q) => (answerMap[q.key] ?? '').trim().length > 0)
  ).length

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#e5e7eb] no-print">
        <div className="max-w-[860px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#111827]">Review Your Answers</h1>
            <p className="text-xs text-[#6b7280]">
              {answeredCount} of {totalQuestions} questions answered · {completedSections} of {SECTIONS.length} sections complete
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push('/questionnaire')}>
              Edit
            </Button>
            <Button
              variant="primary"
              size="sm"
              loading={submitting}
              onClick={handleSubmit}
              className="flex items-center gap-2"
            >
              <Send size={14} />
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6 py-10">
        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#e5e7eb] rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold text-[#3b5bdb] uppercase tracking-wider mb-1">Respondent</p>
              <h2 className="text-xl font-bold text-[#111827]">{respondent.name}</h2>
              <p className="text-sm text-[#6b7280]">{respondent.role} · {respondent.email}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-2xl font-bold text-[#3b5bdb]">
                {Math.round((answeredCount / totalQuestions) * 100)}%
              </span>
              <span className="text-xs text-[#9ca3af]">complete</span>
            </div>
          </div>

          <div className="mt-6 h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3b5bdb] rounded-full transition-all"
              style={{ width: `${Math.round((answeredCount / totalQuestions) * 100)}%` }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 mt-4">{error}</p>
          )}
        </motion.div>

        {/* Sections */}
        {SECTIONS.map((section, sIdx) => {
          const sectionAnswered = section.questions.filter(
            (q) => (answerMap[q.key] ?? '').trim().length > 0
          ).length
          const complete = sectionAnswered === section.questions.length

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.03 }}
              className="bg-white border border-[#e5e7eb] rounded-2xl p-8 mb-4"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1">
                    Section {sIdx + 1}
                  </p>
                  <h3 className="text-lg font-bold text-[#111827]">{section.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={complete ? 'green' : sectionAnswered > 0 ? 'yellow' : 'gray'}>
                    {sectionAnswered}/{section.questions.length}
                  </Badge>
                  <button
                    onClick={() => router.push('/questionnaire')}
                    className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#3b5bdb] hover:bg-[#e0e9ff] transition-all"
                    title="Edit section"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {section.questions.map((q, qIdx) => {
                  const value = answerMap[q.key] ?? ''
                  return (
                    <div key={q.key} className="flex flex-col gap-1.5">
                      <p className="text-xs font-semibold text-[#374151]">
                        {qIdx + 1}. {q.label}
                      </p>
                      {value.trim() ? (
                        <p className="text-sm text-[#111827] leading-relaxed bg-[#f9fafb] rounded-xl px-4 py-3 border border-[#e5e7eb] whitespace-pre-wrap">
                          {value}
                        </p>
                      ) : (
                        <p className="text-sm text-[#9ca3af] italic px-1">No answer yet</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}

        {/* Bottom submit */}
        <div className="mt-8 flex justify-center no-print">
          <Button
            variant="primary"
            size="lg"
            loading={submitting}
            onClick={handleSubmit}
            className="flex items-center gap-2 px-12"
          >
            <Send size={16} />
            Submit Questionnaire
          </Button>
        </div>
      </div>
    </div>
  )
}
