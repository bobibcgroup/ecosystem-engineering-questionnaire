import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { exportToCSV, exportToJSON } from '@/lib/export'
import type { RespondentData } from '@/types'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const user = session.user as { role?: string }
  if (user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') ?? 'json'

  const respondents = await prisma.respondent.findMany({
    include: { answers: true },
    orderBy: { createdAt: 'desc' },
  })

  const data = respondents.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    submittedAt: r.submittedAt?.toISOString() ?? null,
    answers: r.answers.map((a) => ({
      ...a,
      updatedAt: a.updatedAt.toISOString(),
    })),
  })) as RespondentData[]

  if (format === 'csv') {
    const csv = exportToCSV(data)
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="ecosystem-questionnaire-export.csv"',
      },
    })
  }

  const json = exportToJSON(data)
  return new NextResponse(json, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="ecosystem-questionnaire-export.json"',
    },
  })
}
