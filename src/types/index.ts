export interface Question {
  key: string
  label: string
  helper?: string
}

export interface Section {
  id: string
  title: string
  intro: string
  questions: Question[]
}

export interface RespondentData {
  id: string
  name: string
  role: string
  email: string
  createdAt: string
  updatedAt: string
  lastStepIdx: number
  submitted: boolean
  submittedAt: string | null
  answers: AnswerData[]
}

export interface AnswerData {
  id: string
  respondentId: string
  sectionIdx: number
  questionIdx: number
  questionKey: string
  value: string
  updatedAt: string
}

export interface AnswerMap {
  [key: string]: string
}

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export interface AdminRespondent {
  id: string
  name: string
  role: string
  email: string
  createdAt: string
  updatedAt: string
  lastStepIdx: number
  submitted: boolean
  submittedAt: string | null
  answerCount: number
  totalQuestions: number
  completionPercent: number
}
