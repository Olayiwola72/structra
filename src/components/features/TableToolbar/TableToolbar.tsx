import { ChevronDown, LayoutTemplate, Merge, Minus, Plus, Trash2, Undo2, Upload } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { siteConfig } from '../../../config/siteConfig'
import { MAX_COLS, MAX_ROWS } from '../../../config/tableDefaults'
import { presets } from '../../../config/presets'
import { useImport } from '../../../hooks/useImport'
import { useTableContext } from '../../../context/TableContext'
import { Button } from '../../ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/DropdownMenu'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/Tooltip'

export function TableToolbar(): ReactNode {
  const table = useTableContext()
  const csvInputRef = useRef<HTMLInputElement>(null)
  const excelInputRef = useRef<HTMLInputElement>(null)
  const { error, importFile } = useImport()

  const importFromInput = (kind: 'csv' | 'excel', files: FileList | null): void => {
    const file = files?.[0]
    if (!file) return
    void importFile(file, kind)
  }

  const { labels } = siteConfig

  return (
    <div className="flex h-12 items-center gap-2 overflow-x-auto border-b border-border bg-surface px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <LayoutTemplate size={14} aria-hidden="true" /> {labels.templatesLabel} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {presets.map((preset) => (
            <DropdownMenuItem key={preset.id} onClick={() => table.applyPreset(preset)}>
              {preset.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="sm" onClick={table.addRow} disabled={table.rows >= MAX_ROWS}>
          <Plus size={14} aria-hidden="true" /> {labels.addRow}
        </Button>
        <Button variant="ghost" size="sm" onClick={table.addColumn} disabled={table.cols >= MAX_COLS}>
          <Plus size={14} aria-hidden="true" /> {labels.addColumn}
        </Button>
        <Button variant="ghost" size="sm" onClick={table.removeRow} disabled={table.rows <= 1}>
          <Minus size={14} aria-hidden="true" /> {labels.removeRow}
        </Button>
        <Button variant="ghost" size="sm" onClick={table.removeColumn} disabled={table.cols <= 1}>
          <Minus size={14} aria-hidden="true" /> {labels.removeColumn}
        </Button>
      </div>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <div className="flex shrink-0 items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" onClick={table.mergeSelection}>
              <Merge size={14} aria-hidden="true" /> {labels.merge}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{labels.tooltipMerge}</TooltipContent>
        </Tooltip>
        <Button variant="ghost" size="sm" onClick={table.unmergeSelection}>
          {labels.unmerge}
        </Button>
      </div>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <Upload size={14} aria-hidden="true" /> {labels.importLabel} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => csvInputRef.current?.click()}>{labels.importCsv}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => excelInputRef.current?.click()}>{labels.importExcel}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input ref={csvInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => importFromInput('csv', event.target.files)} />
      <input ref={excelInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(event) => importFromInput('excel', event.target.files)} />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <div className="flex shrink-0 items-center gap-1">
        <Button variant="danger" size="sm" onClick={table.clearAll}>
          <Trash2 size={14} aria-hidden="true" /> {labels.clearAll}
        </Button>
        <Button variant="ghost" size="sm" onClick={table.undo} disabled={!table.canUndo}>
          <Undo2 size={14} aria-hidden="true" /> {labels.undo}
        </Button>
      </div>

      {error ? <p className="shrink-0 text-xs text-danger" aria-live="polite">{error}</p> : null}
    </div>
  )
}
