import type { CellData, HeaderStyle, MergeRange } from './table.types'

export type ExportFormat = 'pdf' | 'png' | 'jpeg' | 'excel' | 'csv'

export interface ExportOptions {
  format: ExportFormat
  filename?: string
  quality?: number
  cells?: CellData[][]
  headerStyle?: HeaderStyle
  mergedRanges?: MergeRange[]
}

export interface ExportStrategy {
  export(element: HTMLElement, options: ExportOptions): Promise<void>
}
