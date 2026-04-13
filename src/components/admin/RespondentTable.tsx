'use client'

import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import Badge from '@/components/ui/Badge'
import type { AdminRespondent } from '@/types'

interface RespondentTableProps {
  respondents: AdminRespondent[]
}

export default function RespondentTable({ respondents }: RespondentTableProps) {
  const router = useRouter()

  if (respondents.length === 0) {
    return (
      <div className="text-center py-16 text-[#9ca3af]">
        <p className="text-lg font-medium">No respondents yet</p>
        <p className="text-sm mt-1">Responses will appear here once people start the questionnaire.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#e5e7eb]">
            <th className="text-left py-3 px-4 font-semibold text-[#374151]">Name</th>
            <th className="text-left py-3 px-4 font-semibold text-[#374151]">Role</th>
            <th className="text-left py-3 px-4 font-semibold text-[#374151]">Email</th>
            <th className="text-left py-3 px-4 font-semibold text-[#374151]">Progress</th>
            <th className="text-left py-3 px-4 font-semibold text-[#374151]">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-[#374151]">Last Active</th>
          </tr>
        </thead>
        <tbody>
          {respondents.map((r) => (
            <tr
              key={r.id}
              className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] cursor-pointer transition-colors"
              onClick={() => router.push(`/admin/respondent/${r.id}`)}
            >
              <td className="py-3 px-4 font-medium text-[#111827]">{r.name}</td>
              <td className="py-3 px-4 text-[#6b7280]">{r.role}</td>
              <td className="py-3 px-4 text-[#6b7280]">{r.email}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden w-20">
                    <div
                      className="h-full bg-[#3b5bdb] rounded-full transition-all"
                      style={{ width: `${r.completionPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#6b7280] whitespace-nowrap">
                    {r.completionPercent}%
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">
                {r.submitted ? (
                  <Badge variant="green">Submitted</Badge>
                ) : r.completionPercent > 0 ? (
                  <Badge variant="yellow">In Progress</Badge>
                ) : (
                  <Badge variant="gray">Not Started</Badge>
                )}
              </td>
              <td className="py-3 px-4 text-[#6b7280] text-xs whitespace-nowrap">
                {format(new Date(r.updatedAt), 'MMM d, yyyy HH:mm')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
