'use client'

interface SectionHeaderProps {
  title: string
  intro: string
  sectionNumber: number
}

export default function SectionHeader({ title, intro, sectionNumber }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-[#3b5bdb] uppercase tracking-widest">
          Section {sectionNumber}
        </span>
      </div>
      <h2 className="text-3xl font-bold text-[#111827] leading-tight mb-3">{title}</h2>
      <p className="text-base text-[#6b7280] leading-relaxed max-w-2xl">{intro}</p>
    </div>
  )
}
