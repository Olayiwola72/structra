import { useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { useTableContext } from '../context/TableContext'
import { importCsv, importExcel } from '../services/importService'

export interface ImportApi {
  error: string | null
  importFile: (file: File, kind: 'csv' | 'excel') => Promise<void>
}

export function useImport(): ImportApi {
  const [error, setError] = useState<string | null>(null)
  const { setCells } = useTableContext()

  const importFile = async (file: File, kind: 'csv' | 'excel'): Promise<void> => {
    setError(null)
    try {
      const result = kind === 'csv' ? await importCsv(file) : await importExcel(file)
      setCells(result.cells)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : siteConfig.messages.importParseError)
    }
  }

  return { error, importFile }
}
