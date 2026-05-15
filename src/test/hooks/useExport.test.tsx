import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../context/TableContext'
import { useExport } from '../../hooks/useExport'

vi.mock('../../services/exportService', () => ({
  exportTable: vi.fn().mockResolvedValue(undefined),
}))

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('useExport', () => {
  it('starts with isExporting false', () => {
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    expect(result.current.isExporting).toBe(false)
  })

  it('returns an exportAs function', () => {
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    expect(typeof result.current.exportAs).toBe('function')
  })
})
