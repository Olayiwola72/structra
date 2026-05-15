import { siteConfig } from '../config/siteConfig'
import type { ColumnFormat } from '../types/table.types'

const { locale } = siteConfig

export function formatCellValue(value: string, format: ColumnFormat): string {
  const trimmed = value.trim()
  if (!trimmed || format === 'text') return value

  if (format === 'date') {
    const timestamp = Date.parse(trimmed)
    return Number.isNaN(timestamp)
      ? value
      : new Intl.DateTimeFormat(locale.date, { month: locale.dateMonth, day: locale.dateDay, year: locale.dateYear }).format(timestamp)
  }

  const number = Number(trimmed.replace(/[$,%\s,]/g, ''))
  if (Number.isNaN(number)) return value

  if (format === 'currency') {
    return new Intl.NumberFormat(locale.currency, { currency: locale.currencyCode, style: 'currency' }).format(number)
  }

  if (format === 'percentage') {
    return new Intl.NumberFormat(locale.percent, { maximumFractionDigits: 2, style: 'percent' }).format(number > 1 ? number / 100 : number)
  }

  return new Intl.NumberFormat(locale.number, { maximumFractionDigits: 6 }).format(number)
}

export function getContrastText(hex: string): string {
  const normalized = hex.replace('#', '')
  const red = Number.parseInt(normalized.slice(0, 2), 16)
  const green = Number.parseInt(normalized.slice(2, 4), 16)
  const blue = Number.parseInt(normalized.slice(4, 6), 16)
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000
  return brightness > 145 ? '#111827' : '#ffffff'
}
