import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import ResponseDetail from '@/components/admin/ResponseDetail'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { RespondentData } from '@/types'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export default async function RespondentDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const { id } = await params

  const respondent = await prisma.respondent.findUnique({
    where: { id },
    include: { answers: true },
  })

  if (!respondent) {
    notFound()
  }

  const data: RespondentData = {
    ...respondent,
    createdAt: respondent.createdAt.toISOString(),
    updatedAt: respondent.updatedAt.toISOString(),
    submittedAt: respondent.submittedAt?.toISOString() ?? null,
    answers: respondent.answers.map((a) => ({
      ...a,
      updatedAt: a.updatedAt.toISOString(),
    })),
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Nav */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[860px] mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft size={14} />
              Back to Dashboard
            </Button>
          </Link>
          <div className="w-px h-5 bg-[#e5e7eb]" />
          <span className="text-sm text-[#6b7280]">Respondent Detail</span>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6 py-10">
        <ResponseDetail respondent={data} />
      </div>
    </div>
  )
}
