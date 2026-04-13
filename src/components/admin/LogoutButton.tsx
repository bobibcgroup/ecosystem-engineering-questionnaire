'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#111827] transition-colors px-3 py-2 rounded-lg hover:bg-[#f3f4f6] border border-[#e5e7eb]"
    >
      <LogOut size={14} />
      Sign out
    </button>
  )
}
