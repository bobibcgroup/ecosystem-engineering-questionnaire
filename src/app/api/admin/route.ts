import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { TOTAL_QUESTIONS } from '@/lib/questions'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const user = session.user as { role?: string }
  if (user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const respondents = await prisma.respondent.findMany({
    include: { answers: true },
    orderBy: { createdAt: 'desc' },
  })

  const data = respondents.map((r) => {
    const answerCount = r.answers.filter((a) => a.value.trim().length > 0).length
    return {
      id: r.id,
      name: r.name,
      role: r.role,
      email: r.email,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      lastStepIdx: r.lastStepIdx,
      submitted: r.submitted,
      submittedAt: r.submittedAt,
      answerCount,
      totalQuestions: TOTAL_QUESTIONS,
      completionPercent: Math.round((answerCount / TOTAL_QUESTIONS) * 100),
    }
  })

  return NextResponse.json({ success: true, data })
}
