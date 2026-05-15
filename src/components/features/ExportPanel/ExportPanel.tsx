import type { ReactNode } from 'react'
import { exportFormats } from '../../../config/exportConfig'
import { siteConfig } from '../../../config/siteConfig'
import type { ExportFormat } from '../../../types/export.types'
import { Button } from '../../ui/Button'
import { SectionLabel } from '../../ui/SectionLabel'

export function ExportPanel({
  onExport,
  isExporting,
}: {
  onExport: (format: ExportFormat) => void
  isExporting: boolean
}): ReactNode {
  return (
    <section>
      <SectionLabel>{siteConfig.labels.exportOptions}</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        {exportFormats.map((item) => (
          <Button key={item.format} variant="secondary" size="sm" isLoading={isExporting} onClick={() => onExport(item.format)}>
            {item.label}
          </Button>
        ))}
      </div>
      <p className="mt-3 text-xs text-text-muted">
        Export the finished table as {exportFormats.map((e) => e.label).join(', ').replace(/, ([^,]*)$/, ', or $1')}.
      </p>
    </section>
  )
}
