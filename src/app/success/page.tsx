'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Printer } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function SuccessPage() {
  const { status } = useSession()
  const router = useRouter()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
    if (status === 'authenticated') {
      setShow(true)
    }
  }, [status, router])

  if (!show) return null

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-6 py-12">
      <div className="max-w-[560px] w-full text-center">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 1.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute inset-0 rounded-full bg-[#3b5bdb]"
              style={{ margin: '-16px' }}
            />
            <CheckCircle2 size={80} className="text-[#3b5bdb] relative z-10" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-[#111827] mb-4">
            Responses Submitted
          </h1>
          <p className="text-lg text-[#6b7280] leading-relaxed mb-2">
            Your answers have been recorded.
          </p>
          <p className="text-base text-[#9ca3af] leading-relaxed mb-10 max-w-md mx-auto">
            Thank you for contributing to the ecosystem strategy workshop. Your thoughtful responses will help shape the direction of Saudi Bridge.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-10">
            {[
              { value: '17', label: 'Sections completed' },
              { value: '60+', label: 'Questions answered' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#3b5bdb]">{stat.value}</span>
                <span className="text-xs text-[#9ca3af] mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="ghost"
              onClick={() => window.print()}
              className="flex items-center gap-2 no-print"
            >
              <Printer size={16} />
              Print Summary
            </Button>
          </div>
        </motion.div>

        {/* Confetti-like decorative dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#3b5bdb] opacity-40"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
