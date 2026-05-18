import type { ReactNode } from 'react'
import { Logo } from '../Logo'
import { siteConfig } from '../../../config/siteConfig'

export function PageLoader(): ReactNode {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <Logo variant="icon" className="h-10 w-10 animate-pulse" />
      <p className="animate-pulse text-sm text-text-muted">{siteConfig.labels.loading}</p>
    </div>
  )
}
