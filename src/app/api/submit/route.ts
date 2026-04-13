import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const { respondentId } = body as { respondentId?: string }

  if (!respondentId) {
    return NextResponse.json({ success: false, error: 'respondentId is required' }, { status: 400 })
  }

  const respondent = await prisma.respondent.update({
    where: { id: respondentId },
    data: {
      submitted: true,
      submittedAt: new Date(),
    },
  })

  return NextResponse.json({ success: true, data: respondent })
}
