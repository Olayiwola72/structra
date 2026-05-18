import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableContext'
import { ThemePicker } from '../../../../components/features/ThemePicker/ThemePicker'
import { TABLE_THEMES } from '../../../../config/tableThemes'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('ThemePicker', () => {
  it('renders the section label', () => {
    render(<ThemePicker />, { wrapper: Wrapper })
    expect(screen.getByText('Table Theme')).toBeInTheDocument()
  })

  it('renders all 6 theme options', () => {
    render(<ThemePicker />, { wrapper: Wrapper })
    for (const theme of TABLE_THEMES) {
      expect(screen.getByRole('button', { name: theme.label })).toBeInTheDocument()
    }
  })

  it('highlights the default theme as selected initially', () => {
    render(<ThemePicker />, { wrapper: Wrapper })
    const defaultBtn = screen.getByRole('button', { name: 'Default' })
    expect(defaultBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls setTheme when a theme card is clicked', async () => {
    const user = userEvent.setup()
    render(<ThemePicker />, { wrapper: Wrapper })
    const minimalBtn = screen.getByRole('button', { name: 'Minimal' })
    await user.click(minimalBtn)
    expect(minimalBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('updates selected theme on subsequent clicks', async () => {
    const user = userEvent.setup()
    render(<ThemePicker />, { wrapper: Wrapper })
    const strippedBtn = screen.getByRole('button', { name: 'Striped' })
    await user.click(strippedBtn)
    expect(strippedBtn).toHaveAttribute('aria-pressed', 'true')
    const defaultBtn = screen.getByRole('button', { name: 'Default' })
    expect(defaultBtn).toHaveAttribute('aria-pressed', 'false')
  })
})
