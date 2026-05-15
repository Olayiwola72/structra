import { useCallback, useMemo, useRef, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
import { AUTOFIT_PADDING, MAX_COLUMN_WIDTH, MAX_ROW_HEIGHT, MIN_COLUMN_WIDTH, MIN_ROW_HEIGHT } from '../../../config/tableDefaults'
import { isHeaderCell, useTableContext, useTableData } from '../../../context/TableContext'
import { useColumnResize } from '../../../hooks/useColumnResize'
import { useRowResize } from '../../../hooks/useRowResize'
import { useTableSelection } from '../../../hooks/useTableSelection'
import { getContrastText } from '../../../utils/formatUtils'
import { isRangeAnchor } from '../../../utils/mergeUtils'
import { TableCell } from './TableCell'
import { TableHeaderCell } from './TableHeaderCell'

export function TableGrid({ tableRef }: { tableRef: RefObject<HTMLDivElement> }): ReactNode {
  const { cells } = useTableData()
  const {
    rows,
    cols,
    columnWidths,
    rowHeights,
    headerStyle,
    headerColor,
    contentColor,
    selectedRange,
    mergedRanges,
    updateCell,
    setColumnWidth,
    setRowHeight,
    setColumnFormat,
  } = useTableContext()
  const { selectCell } = useTableSelection()
  const gridRef = useRef<HTMLTableElement>(null)
  const headerTextColor = useMemo(() => getContrastText(headerColor), [headerColor])

  const { ghostLineRef: columnGhostLineRef, onMouseDown: onColumnResizeStart } = useColumnResize(setColumnWidth)
  const { ghostLineRef: rowGhostLineRef, onMouseDown: onRowResizeStart } = useRowResize(setRowHeight)

  const autoFitColumn = useCallback((columnIndex: number): void => {
    const table = gridRef.current
    if (!table) return

    const visibleRows = Array.from(table.rows).filter((row) => getComputedStyle(row).display !== 'none')
    const widths = visibleRows.flatMap((row) => {
      const cell = row.cells.item(columnIndex)
      if (!cell || getComputedStyle(cell).display === 'none') return []
      const measure = cell.querySelector<HTMLElement>('.cell-measure')
      return measure ? [measure.scrollWidth] : [cell.scrollWidth]
    })
    const nextWidth = Math.min(
      Math.max(Math.max(MIN_COLUMN_WIDTH, ...widths) + AUTOFIT_PADDING, MIN_COLUMN_WIDTH),
      MAX_COLUMN_WIDTH,
    )
    setColumnWidth(columnIndex, nextWidth)
  }, [setColumnWidth])

  const autoFitRow = useCallback((rowIndex: number): void => {
    const table = gridRef.current
    if (!table) return

    const row = table.rows.item(rowIndex)
    if (!row || getComputedStyle(row).display === 'none') return

    const heights = Array.from(row.cells).flatMap((cell) => {
      if (getComputedStyle(cell).display === 'none') return []
      const content = cell.querySelector<HTMLElement>('.cell-measure')
      if (!content) return []

      const measure = content.cloneNode(true) as HTMLElement
      measure.style.position = 'absolute'
      measure.style.visibility = 'hidden'
      measure.style.whiteSpace = 'pre-wrap'
      measure.style.width = `${cell.getBoundingClientRect().width}px`
      measure.style.height = 'auto'
      document.body.appendChild(measure)
      const h = measure.scrollHeight
      document.body.removeChild(measure)
      return [h]
    })

    const nextHeight = Math.min(
      Math.max(Math.max(MIN_ROW_HEIGHT, ...heights) + AUTOFIT_PADDING, MIN_ROW_HEIGHT),
      MAX_ROW_HEIGHT,
    )
    setRowHeight(rowIndex, nextHeight)
  }, [setRowHeight])

  const mergeAnchorMap = useMemo(() => {
    const map = new Map<string, (typeof mergedRanges)[number]>()
    for (const range of mergedRanges) {
      if (isRangeAnchor(`R${range.startRow}C${range.startCol}`, range)) {
        map.set(`R${range.startRow}C${range.startCol}`, range)
      }
    }
    return map
  }, [mergedRanges])

  const hiddenSet = useMemo(() => {
    const hidden = new Set<string>()
    for (const range of mergedRanges) {
      for (let r = range.startRow; r <= range.endRow; r++) {
        for (let c = range.startCol; c <= range.endCol; c++) {
          const id = `R${r}C${c}`
          if (!isRangeAnchor(id, range)) {
            hidden.add(id)
          }
        }
      }
    }
    return hidden
  }, [mergedRanges])

  const navigateToCell = useCallback(
    (nextRow: number, nextCol: number): void => {
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) return
      if (hiddenSet.has(`R${nextRow}C${nextCol}`)) return
      const el = document.querySelector<HTMLElement>(`[data-cell-id="R${nextRow}C${nextCol}"] [contenteditable]`)
      el?.focus()
    },
    [cols, rows, hiddenSet],
  )

  const handleCellKeyDown = useCallback(
    (row: number, col: number, event: KeyboardEvent): void => {
      if (event.key === 'Tab') {
        event.preventDefault()
        const shift = event.shiftKey
        let nextRow = row
        let nextCol = shift ? col - 1 : col + 1
        if (nextCol < 0) { nextRow--; nextCol = cols - 1 }
        if (nextCol >= cols) { nextRow++; nextCol = 0 }
        navigateToCell(nextRow, nextCol)
        return
      }

      if (event.key.startsWith('Arrow')) {
        const sel = window.getSelection()
        const text = (event.currentTarget as HTMLElement).textContent ?? ''

        if (event.key === 'ArrowLeft' && sel && sel.rangeCount > 0 && sel.getRangeAt(0).startOffset > 0) return
        if (event.key === 'ArrowRight' && sel && sel.rangeCount > 0 && sel.getRangeAt(0).startOffset < text.length) return

        event.preventDefault()
        const delta: Record<string, [number, number]> = {
          ArrowUp: [-1, 0],
          ArrowDown: [1, 0],
          ArrowLeft: [0, -1],
          ArrowRight: [0, 1],
        }
        const [dr, dc] = delta[event.key] ?? [0, 0]
        navigateToCell(row + dr, col + dc)
      }
    },
    [cols, rows, navigateToCell],
  )

  return (
    <div className="h-full overflow-auto p-2 sm:p-4">
      <div
        className="mb-2 grid min-w-max border border-border bg-surface"
        style={{ gridTemplateColumns: columnWidths.map((width) => `${width}px`).join(' ') }}
        aria-label="Column formatting controls"
      >
        {Array.from({ length: cols }, (_, index) => (
          <TableHeaderCell
            key={index}
            index={index}
            width={columnWidths[index]}
            format={cells[0]?.[index]?.format ?? 'text'}
            onFormatChange={(format) => setColumnFormat(index, format)}
            onResizeStart={onColumnResizeStart}
            onAutoFit={autoFitColumn}
          />
        ))}
      </div>
      <div ref={tableRef} className="inline-block bg-white">
        <table ref={gridRef} className="min-w-max border-collapse bg-white">
          <colgroup>
            {columnWidths.map((width, index) => (
              <col key={index} style={{ width }} />
            ))}
          </colgroup>
          <tbody>
            {cells.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ height: rowHeights[rowIndex] }}>
                {row.map((cell, colIndex) => {
                  if (hiddenSet.has(cell.id)) return null
                  const merge = mergeAnchorMap.get(cell.id)
                  return (
                    <TableCell
                      key={cell.id}
                      cell={cell}
                      row={rowIndex}
                      col={colIndex}
                      headerStyle={headerStyle}
                      headerColor={headerColor}
                      headerTextColor={headerTextColor}
                      contentColor={contentColor}
                      rowHeight={rowHeights[rowIndex]}
                      merge={merge}
                      selectedRange={selectedRange}
                      onSelect={selectCell}
                      onChange={updateCell}
                      onBlur={(cellId, value, col) => {
                        if (!isHeaderCell(headerStyle, rowIndex, col)) {
                          updateCell(cellId, value)
                        }
                      }}
                      onRowResizeStart={onRowResizeStart}
                      onAutoFitRow={autoFitRow}
                      onKeyDown={handleCellKeyDown}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div ref={columnGhostLineRef} className="fixed bottom-0 top-0 z-50 hidden w-px bg-primary pointer-events-none" aria-hidden="true" />
      <div ref={rowGhostLineRef} className="fixed left-0 right-0 z-50 hidden h-px bg-primary pointer-events-none" aria-hidden="true" />
    </div>
  )
}
