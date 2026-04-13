'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import QuestionField from './QuestionField'
import StepNav from './StepNav'
import type { Section } from '@/types'

interface WizardStepProps {
  section: Section
  sectionIndex: number
  totalSections: number
  answers: Record<string, string>
  onAnswerChange: (key: string, value: string) => void
  onNext: () => void
  onPrev: () => void
  canGoPrev: boolean
  isSaving: boolean
  direction: number
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
}

export default function WizardStep({
  section,
  sectionIndex,
  totalSections,
  answers,
  onAnswerChange,
  onNext,
  onPrev,
  canGoPrev,
  isSaving,
  direction,
}: WizardStepProps) {
  const isLastSection = sectionIndex === totalSections - 1

  return (
    <motion.div
      key={section.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col gap-6"
    >
      <SectionHeader
        title={section.title}
        intro={section.intro}
        sectionNumber={sectionIndex + 1}
      />

      <div className="flex flex-col gap-8">
        {section.questions.map((q, i) => (
          <QuestionField
            key={q.key}
            question={q}
            value={answers[q.key] ?? ''}
            onChange={onAnswerChange}
            index={i}
          />
        ))}
      </div>

      <StepNav
        onPrev={onPrev}
        onNext={onNext}
        canGoPrev={canGoPrev}
        canGoNext={true}
        isLastSection={isLastSection}
        isSaving={isSaving}
      />
    </motion.div>
  )
}
