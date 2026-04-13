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

  const { name, email, role } = body as { name?: string; email?: string; role?: string }

  if (!name || !email || !role) {
    return NextResponse.json({ success: false, error: 'name, email, and role are required' }, { status: 400 })
  }

  const existing = await prisma.respondent.findFirst({
    where: { email: email.toLowerCase().trim() },
    include: { answers: true },
  })

  if (existing) {
    return NextResponse.json({ success: true, data: existing })
  }

  // No include on create — avoids potential transaction; new respondent has no answers yet
  const respondent = await prisma.respondent.create({
    data: {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role.trim(),
    },
  })

  return NextResponse.json({ success: true, data: { ...respondent, answers: [] } })
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 })
  }

  const respondent = await prisma.respondent.findUnique({
    where: { id },
    include: { answers: true },
  })

  if (!respondent) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: respondent })
}
