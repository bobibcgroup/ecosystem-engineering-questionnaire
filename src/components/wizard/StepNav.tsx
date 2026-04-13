'use client'

import Button from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface StepNavProps {
  onPrev: () => void
  onNext: () => void
  canGoPrev: boolean
  canGoNext: boolean
  isLastSection: boolean
  isSaving: boolean
  onSubmit?: () => void
}

export default function StepNav({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  isLastSection,
  isSaving,
  onSubmit,
}: StepNavProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-[#e5e7eb]">
      <Button
        variant="ghost"
        onClick={onPrev}
        disabled={!canGoPrev}
        className="flex items-center gap-1.5"
      >
        <ChevronLeft size={16} />
        Back
      </Button>

      {isLastSection ? (
        <Button
          variant="primary"
          onClick={onSubmit}
          loading={isSaving}
          className="flex items-center gap-1.5"
        >
          Review Answers
          <ChevronRight size={16} />
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!canGoNext}
          loading={isSaving}
          className="flex items-center gap-1.5"
        >
          Continue
          <ChevronRight size={16} />
        </Button>
      )}
    </div>
  )
}
