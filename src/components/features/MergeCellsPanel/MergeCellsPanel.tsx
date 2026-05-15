import { Merge } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { siteConfig } from '../../../config/siteConfig'
import { useMergeCells } from '../../../hooks/useMergeCells'
import { normalizeSelection } from '../../../utils/mergeUtils'
import { Button } from '../../ui/Button'
import { SectionLabel } from '../../ui/SectionLabel'

export function MergeCellsPanel(): ReactNode {
  const { selectedRange, mergedRanges, mergeSelection, unmergeSelection } = useMergeCells()
  const range = selectedRange ? normalizeSelection(selectedRange) : null
  const { labels } = siteConfig
  const prevMergedCount = useRef(mergedRanges.length)
  const announceRef = useRef<HTMLParagraphElement>(null)

  const handleMerge = (): void => {
    if (!range) return
    if (range.startRow === range.endRow && range.startCol === range.endCol) {
      if (announceRef.current) announceRef.current.textContent = labels.cannotMergeSingleCell
      return
    }
    prevMergedCount.current = mergedRanges.length
    mergeSelection()
    if (announceRef.current) announceRef.current.textContent = labels.mergeAnnounce
  }

  const handleUnmerge = (): void => {
    if (!range) return
    const wasMerged = mergedRanges.some(
      (r) => range.startRow >= r.startRow && range.startRow <= r.endRow &&
             range.startCol >= r.startCol && range.startCol <= r.endCol,
    )
    prevMergedCount.current = mergedRanges.length
    unmergeSelection()
    if (announceRef.current) {
      announceRef.current.textContent = wasMerged ? labels.unmergeAnnounce : labels.noMergeInSelection
    }
  }

  return (
    <section>
      <SectionLabel>{labels.mergeCells}</SectionLabel>
      <p className="mb-3 text-xs text-text-muted">{labels.mergeInstructions}</p>
      <div className="mb-3 rounded-sm border border-border bg-white px-3 py-2 text-xs text-text-secondary" aria-live="polite" aria-atomic="true">
        {range ? `R${range.startRow + 1}:C${range.startCol + 1} to R${range.endRow + 1}:C${range.endCol + 1}` : labels.noSelection}
      </div>
      <p ref={announceRef} className="sr-only" aria-live="assertive" aria-atomic="true" />
      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary" size="sm" onClick={handleMerge}>
          <Merge size={14} aria-hidden="true" /> {labels.merge}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleUnmerge}>{labels.unmerge}</Button>
      </div>
    </section>
  )
}
