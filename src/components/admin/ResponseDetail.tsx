'use client'

import { format } from 'date-fns'
import { SECTIONS } from '@/lib/questions'
import Badge from '@/components/ui/Badge'
import type { RespondentData, AnswerData } from '@/types'

interface ResponseDetailProps {
  respondent: RespondentData
}

function buildAnswerMap(answers: AnswerData[]): Record<string, string> {
  return answers.reduce<Record<string, string>>((acc, a) => {
    acc[a.questionKey] = a.value
    return acc
  }, {})
}

export default function ResponseDetail({ respondent }: ResponseDetailProps) {
  const answerMap = buildAnswerMap(respondent.answers)
  const answeredCount = respondent.answers.filter((a) => a.value.trim().length > 0).length
  const totalQ = SECTIONS.reduce((s, sec) => s + sec.questions.length, 0)

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">{respondent.name}</h1>
            <p className="text-[#6b7280] mt-1">{respondent.role}</p>
            <p className="text-sm text-[#9ca3af] mt-0.5">{respondent.email}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {respondent.submitted ? (
              <Badge variant="green">Submitted</Badge>
            ) : (
              <Badge variant="yellow">In Progress</Badge>
            )}
            <span className="text-xs text-[#6b7280]">
              {answeredCount} / {totalQ} answered
            </span>
            {respondent.submittedAt && (
              <span className="text-xs text-[#9ca3af]">
                Submitted {format(new Date(respondent.submittedAt), 'MMM d, yyyy HH:mm')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sections */}
      {SECTIONS.map((section, sIdx) => {
        const sectionAnswers = section.questions.map((q) => answerMap[q.key] ?? '')
        const sectionAnswered = sectionAnswers.filter((v) => v.trim().length > 0).length
        const complete = sectionAnswered === section.questions.length

        return (
          <div key={section.id} className="bg-white border border-[#e5e7eb] rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-[#3b5bdb] uppercase tracking-wider mb-1">
                  Section {sIdx + 1}
                </p>
                <h2 className="text-xl font-bold text-[#111827]">{section.title}</h2>
              </div>
              <Badge variant={complete ? 'green' : sectionAnswered > 0 ? 'yellow' : 'gray'}>
                {sectionAnswered}/{section.questions.length}
              </Badge>
            </div>

            <div className="flex flex-col gap-6">
              {section.questions.map((q, qIdx) => {
                const value = answerMap[q.key] ?? ''
                return (
                  <div key={q.key} className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[#374151]">
                      {qIdx + 1}. {q.label}
                    </p>
                    {value.trim() ? (
                      <p className="text-sm text-[#111827] leading-relaxed bg-[#f9fafb] rounded-xl px-4 py-3 border border-[#e5e7eb] whitespace-pre-wrap">
                        {value}
                      </p>
                    ) : (
                      <p className="text-sm text-[#9ca3af] italic px-4 py-3">No answer provided</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
