import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Search } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'
import { IconButton } from '../../../../components/ui/IconButton/IconButton'

describe('IconButton', () => {
  it('renders with the given aria-label', () => {
    render(<IconButton icon={<Search size={16} />} aria-label="Search" />)
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<IconButton icon={<Search size={16} />} aria-label="Search" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('forwards className', () => {
    render(<IconButton icon={<Search size={16} />} aria-label="Search" className="custom-cls" />)
    expect(screen.getByRole('button').className).toContain('custom-cls')
  })
})
