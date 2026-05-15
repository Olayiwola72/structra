import { siteConfig } from '../config/siteConfig'
import { MAX_COLS, MAX_IMPORT_FILE_SIZE, MAX_ROWS } from '../config/tableDefaults'
import type { ImportResult } from '../types/import.types'
import { normalizeTableData } from '../utils/tableUtils'

const FILE_TOO_LARGE = siteConfig.messages.importTooLarge
const READ_ERROR = siteConfig.messages.importParseError

function assertFileSize(file: File): void {
  if (file.size > MAX_IMPORT_FILE_SIZE) {
    throw new Error(FILE_TOO_LARGE)
  }
}

function normaliseRows(rows: unknown[][]): ImportResult {
  const stringRows = rows
    .map((row) => row.map((value) => String(value ?? '')))
    .filter((row) => row.some((value) => value.trim()))
  const rawRowCount = Math.max(stringRows.length, 1)
  const rawColCount = Math.max(...stringRows.map((row) => row.length), 1)

  const rowCount = Math.min(rawRowCount, MAX_ROWS)
  const colCount = Math.min(rawColCount, MAX_COLS)

  return {
    rows: rowCount,
    cols: colCount,
    cells: normalizeTableData(stringRows, rowCount, colCount),
  }
}

export async function importCsv(file: File): Promise<ImportResult> {
  assertFileSize(file)
  const Papa = await import('papaparse')
  return new Promise((resolve, reject) => {
    Papa.default.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length) {
          reject(new Error(READ_ERROR))
          return
        }
        const headers = result.meta.fields ?? []
        const rows = [headers, ...result.data.map((row) => headers.map((header) => row[header] ?? ''))]
        resolve(normaliseRows(rows))
      },
      error: () => reject(new Error(READ_ERROR)),
    })
  })
}

export async function importExcel(file: File): Promise<ImportResult> {
  assertFileSize(file)
  const MAX_XLSX_CELLS = 100_000
  try {
    const buffer = await file.arrayBuffer()
    const XLSX = await import('@e965/xlsx')
    const workbook = XLSX.read(buffer)
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    if (!sheet || !sheet['!ref']) throw new Error(READ_ERROR)
    const decoded = XLSX.utils.decode_range(sheet['!ref'])
    const cellCount = (decoded.e.r - decoded.s.r + 1) * (decoded.e.c - decoded.s.c + 1)
    if (cellCount > MAX_XLSX_CELLS) throw new Error(READ_ERROR)
    const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1 })
    return normaliseRows(rows)
  } catch {
    throw new Error(READ_ERROR)
  }
}
