import type { FeaturePage } from '../types/feature.types'

const featureModules = import.meta.glob<Record<string, unknown>>(
  '../content/features/*.json',
  { eager: true }
)

function parseFeature(raw: Record<string, unknown>): FeaturePage {
  return {
    slug: String(raw.slug ?? ''),
    metaTitle: String(raw.metaTitle ?? ''),
    metaDescription: String(raw.metaDescription ?? ''),
    heroHeadline: String(raw.heroHeadline ?? ''),
    heroSubtext: String(raw.heroSubtext ?? ''),
    icon: String(raw.icon ?? ''),
    benefits: Array.isArray(raw.benefits)
      ? raw.benefits.map((b: Record<string, unknown>) => ({
          icon: String(b.icon ?? ''),
          heading: String(b.heading ?? ''),
          body: String(b.body ?? ''),
        }))
      : [],
    steps: Array.isArray(raw.steps)
      ? raw.steps.map((s: Record<string, unknown>) => ({
          number: Number(s.number ?? 1),
          heading: String(s.heading ?? ''),
          body: String(s.body ?? ''),
        }))
      : [],
    useCases: Array.isArray(raw.useCases) ? raw.useCases.map(String) : [],
    relatedFeatures: Array.isArray(raw.relatedFeatures) ? raw.relatedFeatures.map(String) : [],
    relatedPost: raw.relatedPost ? String(raw.relatedPost) : undefined,
  }
}

export const allFeatures: FeaturePage[] = Object.values(featureModules)
  .map(m => parseFeature(m as Record<string, unknown>))

export function getFeatureBySlug(slug: string): FeaturePage | undefined {
  return allFeatures.find(f => f.slug === slug)
}
