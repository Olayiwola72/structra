import { memo, type ReactNode } from 'react'
import { siteConfig } from '../../../../config/siteConfig'
import { isHeaderCell } from '../../../../context/TableContext'
import { cn } from '../../../../lib/utils'
import type { CellData, HeaderStyle, MergeRange, SelectionRange } from '../../../../types/table.types'
import { formatCellValue } from '../../../../utils/formatUtils'
import { isCellInMergeRange, normalizeSelection } from '../../../../utils/mergeUtils'
import { ResizeHandle } from '../ResizeHandle'

export interface TableCellProps {
  cell: CellData
  row: number
  col: number
  headerStyle: HeaderStyle
  headerColor: string
  headerTextColor: string
  contentColor: string
  rowHeight: number
  merge?: MergeRange
  selectedRange: SelectionRange | null
  onSelect: (row: number, col: number, event: React.MouseEvent) => void
  onChange: (cellId: string, value: string) => void
  onBlur: (cellId: string, value: string, col: number) => void
  onRowResizeStart: (event: React.MouseEvent, row: number, currentHeight: number) => void
  onAutoFitRow: (row: number) => void
  onKeyDown: (row: number, col: number, event: React.KeyboardEvent) => void
}

function TableCellRaw({
  cell,
  row,
  col,
  headerStyle,
  headerColor,
  headerTextColor,
  contentColor,
  rowHeight,
  merge,
  selectedRange,
  onSelect,
  onChange,
  onBlur,
  onRowResizeStart,
  onAutoFitRow,
  onKeyDown,
}: TableCellProps): ReactNode {
  const CellTag = isHeaderCell(headerStyle, row, col) ? 'th' : 'td'
  const selected = selectedRange ? isCellInMergeRange(cell.id, { ...normalizeSelection(selectedRange) }) : false
  const displayValue = formatCellValue(cell.value, cell.format ?? 'text')

  return (
    <CellTag
      role={CellTag === 'td' ? 'cell' : 'columnheader'}
      colSpan={merge ? merge.endCol - merge.startCol + 1 : undefined}
      rowSpan={merge ? merge.endRow - merge.startRow + 1 : undefined}
      className={cn(
        'relative min-w-20 border border-border p-0 align-top text-xs sm:text-sm',
        CellTag === 'th' ? 'font-semibold text-text-inverse' : 'font-normal text-text-primary',
        selected && 'ring-2 ring-inset ring-primary',
        merge && 'bg-primary-light',
      )}
      style={{
        height: rowHeight,
        backgroundColor: CellTag === 'th' ? headerColor : undefined,
        color: CellTag === 'th' ? headerTextColor : contentColor,
      }}
      data-cell-id={cell.id}
      onClick={(event) => onSelect(row, col, event)}
    >
      <div
        contentEditable
        suppressContentEditableWarning
        aria-label={`Cell ${row + 1}, ${col + 1}`}
        className="min-h-11 whitespace-pre-wrap break-words p-1.5 outline-none sm:p-2"
        onInput={(event) => onChange(cell.id, event.currentTarget.textContent ?? '')}
        onBlur={(event) => onBlur(cell.id, event.currentTarget.textContent ?? '', col)}
        onKeyDown={(event) => onKeyDown(row, col, event)}
      >
        {displayValue}
      </div>
      <span className="cell-measure invisible absolute left-0 top-0 whitespace-pre px-2 text-sm" aria-hidden="true">
        {displayValue || ' '}
      </span>
      <ResizeHandle
        axis="row"
        label={siteConfig.labels.autoFitRow}
        onMouseDown={(event) => onRowResizeStart(event, row, rowHeight)}
        onDoubleClick={() => onAutoFitRow(row)}
      />
    </CellTag>
  )
}

export const TableCell = memo(TableCellRaw, (prev, next) => {
  if (prev.cell.id !== next.cell.id) return false
  if (prev.cell.value !== next.cell.value) return false
  if (prev.cell.colSpan !== next.cell.colSpan) return false
  if (prev.cell.rowSpan !== next.cell.rowSpan) return false
  if (prev.cell.isMerged !== next.cell.isMerged) return false
  if (prev.cell.format !== next.cell.format) return false
  if (prev.row !== next.row) return false
  if (prev.col !== next.col) return false
  if (prev.headerStyle !== next.headerStyle) return false
  if (prev.headerColor !== next.headerColor) return false
  if (prev.headerTextColor !== next.headerTextColor) return false
  if (prev.contentColor !== next.contentColor) return false
  if (prev.rowHeight !== next.rowHeight) return false
  if (prev.selectedRange !== next.selectedRange) return false
  if (prev.merge !== next.merge) {
    if (prev.merge?.key !== next.merge?.key) return false
  }
  return true
})
