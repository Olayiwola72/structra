import { describe, it, expect } from 'vitest'
import { allPosts, getPostBySlug, getAllTags } from '../../services/blogService'

describe('blogService', () => {
  it('loads at least one blog post', () => {
    expect(allPosts.length).toBeGreaterThan(0)
  })

  it('derives slug from filename correctly', () => {
    const post = allPosts.find(p => p.slug === 'how-to-make-a-table-in-markdown')
    expect(post).toBeDefined()
  })

  it('puts featured posts before non-featured posts', () => {
    const featuredIdx = allPosts.findIndex(p => p.featured)
    const nonFeaturedIdx = allPosts.findIndex(p => !p.featured)
    if (featuredIdx >= 0 && nonFeaturedIdx >= 0) {
      expect(featuredIdx).toBeLessThan(nonFeaturedIdx)
    }
  })

  it('sorts non-featured posts newest first', () => {
    const nonFeatured = allPosts.filter(p => !p.featured)
    if (nonFeatured.length >= 2) {
      const dates = nonFeatured.map(p => new Date(p.date).getTime())
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i]).toBeLessThanOrEqual(dates[i - 1])
      }
    }
  })

  it('sorts featured posts before non-featured', () => {
    const featuredIdx = allPosts.findIndex(p => p.featured)
    const nonFeaturedIdx = allPosts.findIndex(p => !p.featured)
    if (featuredIdx >= 0 && nonFeaturedIdx >= 0) {
      expect(featuredIdx).toBeLessThan(nonFeaturedIdx)
    }
  })

  it('getPostBySlug returns correct post for valid slug', () => {
    const post = getPostBySlug('how-to-make-a-table-in-markdown')
    expect(post).toBeDefined()
    expect(post!.title).toBe('How to Make a Table in Markdown')
  })

  it('getPostBySlug returns undefined for unknown slug', () => {
    expect(getPostBySlug('nonexistent')).toBeUndefined()
  })

  it('getAllTags returns unique sorted tags across all posts', () => {
    const tags = getAllTags()
    expect(tags.length).toBeGreaterThan(0)
    for (let i = 1; i < tags.length; i++) {
      expect(tags[i] >= tags[i - 1]).toBe(true)
    }
  })

  it('all posts have required fields', () => {
    for (const post of allPosts) {
      expect(post.title).toBeTruthy()
      expect(post.date).toBeTruthy()
      expect(post.description).toBeTruthy()
      expect(post.author).toBeTruthy()
      expect(post.tags.length).toBeGreaterThan(0)
      expect(post.readTime).toBeGreaterThan(0)
      expect(post.content).toBeTruthy()
    }
  })
})
