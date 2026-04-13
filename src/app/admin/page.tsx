import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { TOTAL_QUESTIONS } from '@/lib/questions'
import { format } from 'date-fns'
import RespondentTable from '@/components/admin/RespondentTable'
import ExportPanel from '@/components/admin/ExportPanel'
import type { AdminRespondent } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const respondents = await prisma.respondent.findMany({
    include: { answers: true },
    orderBy: { createdAt: 'desc' },
  })

  const adminRespondents: AdminRespondent[] = respondents.map((r) => {
    const answerCount = r.answers.filter((a) => a.value.trim().length > 0).length
    return {
      id: r.id,
      name: r.name,
      role: r.role,
      email: r.email,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      lastStepIdx: r.lastStepIdx,
      submitted: r.submitted,
      submittedAt: r.submittedAt?.toISOString() ?? null,
      answerCount,
      totalQuestions: TOTAL_QUESTIONS,
      completionPercent: Math.round((answerCount / TOTAL_QUESTIONS) * 100),
    }
  })

  const total = adminRespondents.length
  const submitted = adminRespondents.filter((r) => r.submitted).length
  const inProgress = adminRespondents.filter((r) => !r.submitted && r.answerCount > 0).length

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Top nav */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0f1a4a] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#3b5bdb]" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#111827]">Admin Dashboard</span>
              <span className="text-xs text-[#9ca3af] ml-2">
                Last updated: {format(new Date(), 'MMM d, yyyy HH:mm')}
              </span>
            </div>
          </div>
          <ExportPanel />
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Respondents', value: total, color: 'text-[#111827]' },
            { label: 'Submitted', value: submitted, color: 'text-green-600' },
            { label: 'In Progress', value: inProgress, color: 'text-yellow-600' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-[#e5e7eb] rounded-2xl p-6 text-center shadow-sm"
            >
              <div className={`text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-[#6b7280]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e5e7eb]">
            <h2 className="text-base font-semibold text-[#111827]">All Respondents</h2>
            <p className="text-xs text-[#9ca3af] mt-0.5">Click a row to view full responses</p>
          </div>
          <RespondentTable respondents={adminRespondents} />
        </div>
      </div>
    </div>
  )
}
