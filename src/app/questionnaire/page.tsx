'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import WizardContainer from '@/components/wizard/WizardContainer'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import type { RespondentData } from '@/types'

const RESPONDENT_KEY = 'eq_respondent_id'

type AppState = 'loading' | 'welcome' | 'wizard'

export default function QuestionnairePage() {
  const { status } = useSession()
  const router = useRouter()
  const [appState, setAppState] = useState<AppState>('loading')
  const [respondent, setRespondent] = useState<RespondentData | null>(null)

  // Welcome form state
  const [selected, setSelected] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const RESPONDENTS = [
    { label: 'Bob', name: 'Bob', role: 'Team Member', email: 'bob@internal' },
    { label: 'Fahad', name: 'Fahad', role: 'Team Member', email: 'fahad@internal' },
  ]

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
    if (status !== 'authenticated') return

    const savedId = localStorage.getItem(RESPONDENT_KEY)
    if (!savedId) {
      setAppState('welcome')
      return
    }

    fetch(`/api/respondent?id=${savedId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setRespondent(res.data as RespondentData)
          setAppState('wizard')
        } else {
          localStorage.removeItem(RESPONDENT_KEY)
          setAppState('welcome')
        }
      })
      .catch(() => {
        localStorage.removeItem(RESPONDENT_KEY)
        setAppState('welcome')
      })
  }, [status, router])

  const handleWelcomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!selected) {
      setFormError('Please select who you are.')
      return
    }

    const respondent = RESPONDENTS.find((r) => r.name === selected)!

    setSubmitting(true)
    try {
      const res = await fetch('/api/respondent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: respondent.name, email: respondent.email, role: respondent.role }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error ?? 'Failed to create respondent')

      localStorage.setItem(RESPONDENT_KEY, data.data.id)
      setRespondent(data.data as RespondentData)
      setAppState('wizard')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (appState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (appState === 'welcome') {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="bg-white border border-[#e5e7eb] shadow-sm rounded-2xl p-10">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#0f1a4a] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#3b5bdb]" />
                </div>
                <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest">
                  Saudi Bridge
                </span>
              </div>
              <h1 className="text-3xl font-bold text-[#111827] mb-3">
                Before we begin
              </h1>
              <p className="text-[#6b7280] text-sm leading-relaxed">
                Select your name to begin. Your answers are saved automatically — you can return anytime to continue.
              </p>
            </div>

            <form onSubmit={handleWelcomeSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#374151]">Who are you?</label>
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm text-[#111827] bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#3b5bdb] focus:border-transparent appearance-none cursor-pointer"
                  autoFocus
                >
                  <option value="">Select your name...</option>
                  {RESPONDENTS.map((r) => (
                    <option key={r.name} value={r.name}>{r.label}</option>
                  ))}
                </select>
              </div>

              {formError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500"
                >
                  {formError}
                </motion.p>
              )}

              <Button type="submit" loading={submitting} size="lg" className="w-full mt-2">
                Start Questionnaire
              </Button>
            </form>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: '17', sub: 'Sections' },
                { label: '60+', sub: 'Questions' },
                { label: '∞', sub: 'Save points' },
              ].map((stat) => (
                <div key={stat.sub} className="text-center p-3 bg-[#f9fafb] rounded-xl">
                  <div className="text-xl font-bold text-[#3b5bdb]">{stat.label}</div>
                  <div className="text-xs text-[#9ca3af] mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (appState === 'wizard' && respondent) {
    return <WizardContainer respondent={respondent} />
  }

  return null
}
