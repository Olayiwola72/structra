import { memo, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '../../../../config/siteConfig'
import type { ColumnFormat } from '../../../../types/table.types'
import { ResizeHandle } from '../ResizeHandle'

export interface TableHeaderCellProps {
  index: number
  width: number
  format: ColumnFormat
  onFormatChange: (format: ColumnFormat) => void
  onResizeStart: (event: React.MouseEvent, index: number, width: number) => void
  onAutoFit: (index: number) => void
}

function TableHeaderCellRaw({
  index,
  width,
  format,
  onFormatChange,
  onResizeStart,
  onAutoFit,
}: TableHeaderCellProps): ReactNode {
  return (
    <div className="relative flex min-w-20 items-center justify-between border-r border-border bg-surface pl-2 pr-3 py-1 md:pr-2">
      <label className="flex items-center gap-1 text-xs font-medium text-text-secondary">
        C{index + 1}
        <select
          value={format}
          aria-label={`Column type ${index + 1}`}
          title={`Column type: ${format}`}
          className="h-8 rounded-sm border border-border bg-white px-2 text-xs text-text-primary"
          onChange={(event) => onFormatChange(event.target.value as ColumnFormat)}
        >
          {siteConfig.columnFormats.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <ChevronDown size={13} aria-hidden="true" className="text-text-muted" />
      <ResizeHandle
        axis="column"
        label={siteConfig.labels.autoFitColumn}
        onMouseDown={(event) => onResizeStart(event, index, width)}
        onDoubleClick={() => onAutoFit(index)}
      />
    </div>
  )
}

export const TableHeaderCell = memo(TableHeaderCellRaw, (prev, next) => {
  if (prev.index !== next.index) return false
  if (prev.width !== next.width) return false
  if (prev.format !== next.format) return false
  return true
})
