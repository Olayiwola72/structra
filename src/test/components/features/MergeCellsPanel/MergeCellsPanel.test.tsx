import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableContext'
import { MergeCellsPanel } from '../../../../components/features/MergeCellsPanel/MergeCellsPanel'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('MergeCellsPanel', () => {
  it('renders Merge Cells label', () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Merge Cells')).toBeInTheDocument()
  })

  it('renders Merge and Unmerge buttons', () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: 'Merge' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /unmerge/i })).toBeInTheDocument()
  })

  it('shows "No selection" initially', () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('No selection')).toBeInTheDocument()
  })
})
