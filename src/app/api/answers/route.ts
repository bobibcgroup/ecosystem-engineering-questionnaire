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

  const { respondentId, sectionIdx, questionIdx, questionKey, value, lastStepIdx } = body as {
    respondentId?: string
    sectionIdx?: number
    questionIdx?: number
    questionKey?: string
    value?: string
    lastStepIdx?: number
  }

  if (!respondentId || sectionIdx === undefined || questionIdx === undefined || !questionKey) {
    return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
  }

  // Avoid upsert (uses transactions) — manual find + create/update
  const existing = await prisma.answer.findUnique({
    where: {
      respondentId_sectionIdx_questionIdx: { respondentId, sectionIdx, questionIdx },
    },
  })

  const answer = existing
    ? await prisma.answer.update({
        where: { id: existing.id },
        data: { value: value ?? '' },
      })
    : await prisma.answer.create({
        data: { respondentId, sectionIdx, questionIdx, questionKey, value: value ?? '' },
      })

  if (lastStepIdx !== undefined) {
    await prisma.respondent.update({
      where: { id: respondentId },
      data: { lastStepIdx },
    })
  }

  return NextResponse.json({ success: true, data: answer })
}

export async function PUT(req: NextRequest) {
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

  const { respondentId, sectionIdx, answers, lastStepIdx } = body as {
    respondentId?: string
    sectionIdx?: number
    answers?: Array<{ questionIdx: number; questionKey: string; value: string }>
    lastStepIdx?: number
  }

  if (!respondentId || sectionIdx === undefined || !answers) {
    return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
  }

  // Avoid upsert (uses transactions) — delete existing rows then recreate
  await prisma.answer.deleteMany({ where: { respondentId, sectionIdx } })

  if (answers.length > 0) {
    await prisma.answer.createMany({
      data: answers.map((a) => ({
        respondentId,
        sectionIdx,
        questionIdx: a.questionIdx,
        questionKey: a.questionKey,
        value: a.value,
      })),
    })
  }

  if (lastStepIdx !== undefined) {
    await prisma.respondent.update({
      where: { id: respondentId },
      data: { lastStepIdx },
    })
  }

  return NextResponse.json({ success: true })
}
