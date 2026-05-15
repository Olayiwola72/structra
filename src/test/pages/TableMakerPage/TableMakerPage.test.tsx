import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TooltipProvider } from '../../../components/ui/Tooltip'
import { TableMakerPage } from '../../../pages/TableMakerPage/TableMakerPage'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TooltipProvider>{children}</TooltipProvider>
}

describe('TableMakerPage', () => {
  it('renders the main toolbar', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /add row/i })).toBeInTheDocument()
  })

  it('renders the Grid Size panel', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByText('Grid Size')).toBeInTheDocument()
  })

  it('renders the table workspace region', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByLabelText('Editable table workspace')).toBeInTheDocument()
  })
})
