import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ColorSwatch } from '../../../../components/ui/ColorSwatch/ColorSwatch'

describe('ColorSwatch', () => {
  it('renders with the given label as aria-label', () => {
    render(<ColorSwatch label="Blue" value="#1E40AF" />)
    expect(screen.getByRole('button', { name: 'Blue' })).toBeInTheDocument()
  })

  it('sets aria-pressed when selected', () => {
    render(<ColorSwatch label="Blue" value="#1E40AF" selected />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('does not set aria-pressed when not selected', () => {
    render(<ColorSwatch label="Blue" value="#1E40AF" />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('shows a check icon when selected', () => {
    render(<ColorSwatch label="Blue" value="#1E40AF" selected />)
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
  })

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<ColorSwatch label="Red" value="#DC2626" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
