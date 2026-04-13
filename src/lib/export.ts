import Papa from 'papaparse'
import type { RespondentData, AnswerData } from '@/types'
import { SECTIONS } from './questions'

function buildAnswerMap(answers: AnswerData[]): Record<string, string> {
  return answers.reduce<Record<string, string>>((acc, a) => {
    acc[a.questionKey] = a.value
    return acc
  }, {})
}

export function exportToCSV(respondents: RespondentData[]): string {
  const allQuestions = SECTIONS.flatMap((s) => s.questions.map((q) => ({ section: s.title, ...q })))

  const headers = ['Name', 'Role', 'Email', 'Submitted', 'Submitted At', ...allQuestions.map((q) => q.label)]

  const rows = respondents.map((r) => {
    const answerMap = buildAnswerMap(r.answers)
    return [
      r.name,
      r.role,
      r.email,
      r.submitted ? 'Yes' : 'No',
      r.submittedAt ?? '',
      ...allQuestions.map((q) => answerMap[q.key] ?? ''),
    ]
  })

  return Papa.unparse({ fields: headers, data: rows })
}

export function exportToJSON(respondents: RespondentData[]): string {
  const formatted = respondents.map((r) => {
    const answerMap = buildAnswerMap(r.answers)
    return {
      id: r.id,
      name: r.name,
      role: r.role,
      email: r.email,
      submitted: r.submitted,
      submittedAt: r.submittedAt,
      createdAt: r.createdAt,
      sections: SECTIONS.map((s) => ({
        id: s.id,
        title: s.title,
        questions: s.questions.map((q) => ({
          key: q.key,
          label: q.label,
          answer: answerMap[q.key] ?? '',
        })),
      })),
    }
  })
  return JSON.stringify(formatted, null, 2)
}

export function exportReadable(respondent: RespondentData): string {
  const answerMap = buildAnswerMap(respondent.answers)
  const lines: string[] = [
    `ECOSYSTEM ENGINEERING QUESTIONNAIRE`,
    `=====================================`,
    ``,
    `Respondent: ${respondent.name}`,
    `Role: ${respondent.role}`,
    `Email: ${respondent.email}`,
    `Submitted: ${respondent.submitted ? 'Yes' : 'No'}`,
    respondent.submittedAt ? `Submitted At: ${respondent.submittedAt}` : '',
    ``,
    `=====================================`,
    ``,
  ]

  SECTIONS.forEach((s, idx) => {
    lines.push(`SECTION ${idx + 1}: ${s.title.toUpperCase()}`)
    lines.push(`${'─'.repeat(60)}`)
    s.questions.forEach((q, qIdx) => {
      lines.push(``)
      lines.push(`Q${qIdx + 1}. ${q.label}`)
      lines.push(``)
      lines.push(answerMap[q.key] || '(No answer provided)')
      lines.push(``)
    })
    lines.push(``)
  })

  return lines.filter((l) => l !== undefined).join('\n')
}
