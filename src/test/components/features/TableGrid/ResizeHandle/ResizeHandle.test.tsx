import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ResizeHandle } from '../../../../../components/features/TableGrid/ResizeHandle/ResizeHandle'

describe('ResizeHandle', () => {
  it('renders with column axis classes', () => {
    render(<ResizeHandle axis="column" label="Resize column" />)
    const handle = screen.getByRole('button', { name: 'Resize column' })
    expect(handle.className).toContain('cursor-col-resize')
  })

  it('renders with row axis classes', () => {
    render(<ResizeHandle axis="row" label="Resize row" />)
    const handle = screen.getByRole('button', { name: 'Resize row' })
    expect(handle.className).toContain('cursor-row-resize')
  })

  it('fires onMouseDown event', async () => {
    const user = userEvent.setup()
    const onMouseDown = vi.fn()
    render(<ResizeHandle axis="column" label="Resize" onMouseDown={onMouseDown} />)
    await user.click(screen.getByRole('button'))
    expect(onMouseDown).toHaveBeenCalledOnce()
  })

  it('fires onDoubleClick event', async () => {
    const user = userEvent.setup()
    const onDoubleClick = vi.fn()
    render(<ResizeHandle axis="column" label="Resize" onDoubleClick={onDoubleClick} />)
    await user.dblClick(screen.getByRole('button'))
    expect(onDoubleClick).toHaveBeenCalledOnce()
  })
})
