import { memo, type ReactNode } from 'react'

function SectionLabelRaw({ children }: { children: ReactNode }): ReactNode {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
      {children}
    </h2>
  )
}

export const SectionLabel = memo(SectionLabelRaw)
