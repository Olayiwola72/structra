import { useMemo, type ReactNode } from 'react'
import type { HeaderStyle } from '../../../types/table.types'
import { siteConfig } from '../../../config/siteConfig'
import { useTableContext } from '../../../context/TableContext'
import { SectionLabel } from '../../ui/SectionLabel'

const options = siteConfig.labels.headerStyleOptions
const labelByValue = new Map(options.map((o) => [o.value, o.label]))

export function HeaderOptionsPanel(): ReactNode {
  const { headerStyle, setHeaderStyle } = useTableContext()
  const currentLabel = useMemo(() => labelByValue.get(headerStyle) ?? '', [headerStyle])
  return (
    <section>
      <SectionLabel>{siteConfig.labels.headerDefinitions}</SectionLabel>
      <label className="space-y-1 text-sm font-medium text-text-primary">
        {siteConfig.labels.headerStyle}
        <select className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm" value={headerStyle} onChange={(event) => setHeaderStyle(event.target.value as HeaderStyle)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      <p className="mt-2 text-xs text-text-muted">Current: {currentLabel}</p>
    </section>
  )
}
