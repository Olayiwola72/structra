import type { ReactNode } from 'react'

export function ResizeHandle({
  axis,
  label,
  onMouseDown,
  onDoubleClick,
}: {
  axis: 'column' | 'row'
  label: string
  onMouseDown?: (event: React.MouseEvent<HTMLSpanElement>) => void
  onDoubleClick?: () => void
}): ReactNode {
  const axisClass = axis === 'column'
    ? 'right-0 top-0 h-full w-1 cursor-col-resize'
    : 'bottom-0 left-0 w-full h-1 cursor-row-resize'

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      title={label}
      className={`absolute ${axisClass} opacity-0 transition-opacity duration-100 hover:opacity-100 hover:bg-primary`}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    />
  )
}
