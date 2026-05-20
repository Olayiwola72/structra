import { describe, it, expect } from 'vitest'
import { allFeatures, getFeatureBySlug } from '../../../services/featureService'

describe('featureService', () => {
  it('loads all JSON files from src/content/features/', () => {
    expect(allFeatures.length).toBeGreaterThanOrEqual(6)
  })

  it('all features have slugs', () => {
    const slugs = allFeatures.map(f => f.slug)
    expect(slugs).toContain('excel-export')
    expect(slugs).toContain('pdf-export')
    expect(slugs).toContain('csv-import')
    expect(slugs).toContain('merge-cells')
    expect(slugs).toContain('custom-headers')
    expect(slugs).toContain('drag-to-resize')
  })

  it('getFeatureBySlug returns correct feature for valid slug', () => {
    const feature = getFeatureBySlug('excel-export')
    expect(feature).toBeDefined()
    expect(feature!.slug).toBe('excel-export')
  })

  it('getFeatureBySlug returns undefined for unknown slug', () => {
    expect(getFeatureBySlug('nonexistent')).toBeUndefined()
  })

  it('every feature has required fields', () => {
    for (const f of allFeatures) {
      expect(f.slug).toBeTruthy()
      expect(f.metaTitle).toBeTruthy()
      expect(f.metaDescription).toBeTruthy()
      expect(f.heroHeadline).toBeTruthy()
      expect(f.heroSubtext).toBeTruthy()
      expect(Array.isArray(f.benefits)).toBe(true)
      expect(Array.isArray(f.steps)).toBe(true)
      expect(Array.isArray(f.useCases)).toBe(true)
      expect(Array.isArray(f.relatedFeatures)).toBe(true)
    }
  })

  it('every benefit has heading and body', () => {
    for (const f of allFeatures) {
      for (const b of f.benefits) {
        expect(b.heading).toBeTruthy()
        expect(b.body).toBeTruthy()
      }
    }
  })

  it('every step has number, heading, and body', () => {
    for (const f of allFeatures) {
      for (const s of f.steps) {
        expect(typeof s.number).toBe('number')
        expect(s.heading).toBeTruthy()
        expect(s.body).toBeTruthy()
      }
    }
  })
})
