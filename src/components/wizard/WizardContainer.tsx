'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { SECTIONS } from '@/lib/questions'
import WizardStep from './WizardStep'
import ProgressBar from './ProgressBar'
import SaveStatus from './SaveStatus'
import type { RespondentData, SaveStatus as SaveStatusType, AnswerMap } from '@/types'

interface WizardContainerProps {
  respondent: RespondentData
}

function buildInitialAnswers(respondent: RespondentData): AnswerMap {
  return respondent.answers.reduce<AnswerMap>((acc, a) => {
    acc[a.questionKey] = a.value
    return acc
  }, {})
}

export default function WizardContainer({ respondent }: WizardContainerProps) {
  const router = useRouter()
  const [currentSectionIdx, setCurrentSectionIdx] = useState(
    Math.min(respondent.lastStepIdx, SECTIONS.length - 1)
  )
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<AnswerMap>(buildInitialAnswers(respondent))
  const [saveStatus, setSaveStatus] = useState<SaveStatusType>('idle')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingSave = useRef<AnswerMap>({})

  const totalSections = SECTIONS.length
  const currentSection = SECTIONS[currentSectionIdx]

  const answeredInSection = useCallback(
    (sectionIdx: number) => {
      const section = SECTIONS[sectionIdx]
      return section.questions.filter((q) => (answers[q.key] ?? '').trim().length > 0).length
    },
    [answers]
  )

  const totalAnswered = SECTIONS.reduce((sum, _, i) => sum + answeredInSection(i), 0)
  const totalQuestions = SECTIONS.reduce((sum, s) => sum + s.questions.length, 0)
  const overallPercent = Math.round((totalAnswered / totalQuestions) * 100)

  const saveAnswers = useCallback(
    async (sectionIdx: number, answersToSave: AnswerMap, newStepIdx?: number) => {
      const section = SECTIONS[sectionIdx]
      const answersArr = section.questions.map((q, qi) => ({
        questionIdx: qi,
        questionKey: q.key,
        value: answersToSave[q.key] ?? '',
      }))

      setSaveStatus('saving')
      try {
        const res = await fetch('/api/answers', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            respondentId: respondent.id,
            sectionIdx,
            answers: answersArr,
            lastStepIdx: newStepIdx ?? sectionIdx,
          }),
        })
        if (!res.ok) throw new Error('Failed to save')
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } catch {
        setSaveStatus('error')
      }
    },
    [respondent.id]
  )

  const handleAnswerChange = useCallback(
    (key: string, value: string) => {
      setAnswers((prev) => {
        const next = { ...prev, [key]: value }
        pendingSave.current = next
        return next
      })

      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => {
        saveAnswers(currentSectionIdx, pendingSave.current)
      }, 800)
    },
    [currentSectionIdx, saveAnswers]
  )

  const handleNext = useCallback(async () => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    await saveAnswers(currentSectionIdx, answers, currentSectionIdx + 1)

    if (currentSectionIdx < totalSections - 1) {
      setDirection(1)
      setCurrentSectionIdx((prev) => prev + 1)
    } else {
      router.push('/review')
    }
  }, [currentSectionIdx, totalSections, answers, saveAnswers, router])

  const handlePrev = useCallback(async () => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    await saveAnswers(currentSectionIdx, answers, currentSectionIdx - 1)
    setDirection(-1)
    setCurrentSectionIdx((prev) => Math.max(0, prev - 1))
  }, [currentSectionIdx, answers, saveAnswers])

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[860px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <ProgressBar
                current={currentSectionIdx + 1}
                total={totalSections}
                sectionName={currentSection.title}
                percent={overallPercent}
              />
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <SaveStatus status={saveStatus} />
              <button
                onClick={() => {
                  localStorage.removeItem('eq_respondent_id')
                  signOut({ callbackUrl: '/login' })
                }}
                className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-[#374151] transition-colors px-2 py-1.5 rounded-lg hover:bg-[#f3f4f6]"
                title="Sign out"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar + content layout */}
      <div className="max-w-[1100px] mx-auto px-6 py-10 flex gap-8">
        {/* Sidebar — desktop only */}
        <aside className="hidden lg:flex flex-col gap-1 w-52 flex-shrink-0 pt-1">
          {SECTIONS.map((s, i) => {
            const answered = answeredInSection(i)
            const total = s.questions.length
            const complete = answered === total
            const active = i === currentSectionIdx
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (i !== currentSectionIdx) {
                    setDirection(i > currentSectionIdx ? 1 : -1)
                    setCurrentSectionIdx(i)
                  }
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs transition-all flex items-start gap-2 ${
                  active
                    ? 'bg-[#e0e9ff] text-[#3b5bdb] font-semibold'
                    : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151]'
                }`}
              >
                <span
                  className={`flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                    complete
                      ? 'bg-[#3b5bdb] border-[#3b5bdb]'
                      : active
                      ? 'border-[#3b5bdb]'
                      : 'border-[#d1d5db]'
                  }`}
                >
                  {complete && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="leading-tight">{s.title}</span>
              </button>
            )
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-[860px]">
          <div className="bg-white border border-[#e5e7eb] shadow-sm rounded-2xl p-8 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <WizardStep
                key={currentSection.id}
                section={currentSection}
                sectionIndex={currentSectionIdx}
                totalSections={totalSections}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                onNext={handleNext}
                onPrev={handlePrev}
                canGoPrev={currentSectionIdx > 0}
                isSaving={saveStatus === 'saving'}
                direction={direction}
              />
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
