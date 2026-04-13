'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Incorrect password. Please try again.')
      return
    }

    // Fetch session to determine role
    const res = await fetch('/api/auth/session')
    const session = await res.json()
    const role = session?.user?.role

    if (role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/questionnaire')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f1a4a] relative overflow-hidden flex-col justify-between p-16">
        {/* Geometric background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Animated circles */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full border border-white/10"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-32 left-10 w-40 h-40 rounded-full border border-white/10"
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-[#3b5bdb]/20"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#3b5bdb] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <span className="text-white/60 text-sm font-medium uppercase tracking-widest">
              Saudi Bridge
            </span>
          </div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Ecosystem<br />Engineering<br />
              <span className="text-[#c9963e]">Questionnaire</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-sm">
              Answer thoughtfully.<br />Build strategically.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10">
          <div className="flex gap-6">
            {['17 Sections', '60+ Questions', 'Save & Resume'].map((item) => (
              <div key={item} className="flex flex-col">
                <span className="text-white font-semibold text-sm">{item}</span>
                <div className="w-6 h-0.5 bg-[#3b5bdb] mt-1 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-[#3b5bdb] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <span className="text-[#374151] text-sm font-semibold uppercase tracking-widest">
              Ecosystem Engineering
            </span>
          </div>

          <h2 className="text-3xl font-bold text-[#111827] mb-2">Welcome</h2>
          <p className="text-[#6b7280] text-sm mb-10">
            Enter your access password to begin.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#374151]">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#e5e7eb] text-sm text-[#111827] placeholder:text-[#9ca3af] bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#3b5bdb] focus:border-transparent"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500 mt-1"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <Button type="submit" loading={loading} size="lg" className="w-full">
              Access Questionnaire
            </Button>
          </form>

          <p className="text-xs text-[#9ca3af] text-center mt-8">
            Your progress is automatically saved as you type.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
