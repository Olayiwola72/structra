import type { BlogPost } from '../types/blog.types'
import post01 from '../content/blog/how-to-make-a-table-in-markdown'
import post02 from '../content/blog/copy-excel-table-to-web'
import post03 from '../content/blog/free-online-table-makers-compared'
import post04 from '../content/blog/how-to-export-table-to-pdf'
import post05 from '../content/blog/best-table-tool-for-researchers'
import post06 from '../content/blog/how-to-merge-cells-in-online-table'

const all: BlogPost[] = [post01, post02, post03, post04, post05, post06]

export const allPosts: BlogPost[] = [...all].sort((a, b) => {
  if (a.featured && !b.featured) return -1
  if (!a.featured && b.featured) return 1
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find(p => p.slug === slug)
}

export function getAllTags(): string[] {
  return [...new Set(allPosts.flatMap(p => p.tags))].sort()
}
