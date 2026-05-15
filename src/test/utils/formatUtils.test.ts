import { describe, expect, it } from 'vitest'
import { formatCellValue, getContrastText } from '../../utils/formatUtils'

describe('formatCellValue', () => {
  it('returns the value as-is for text format', () => {
    expect(formatCellValue('hello', 'text')).toBe('hello')
  })

  it('returns the value as-is for empty or whitespace-only input', () => {
    expect(formatCellValue('', 'number')).toBe('')
    expect(formatCellValue('  ', 'currency')).toBe('  ')
  })

  describe('number format', () => {
    it('formats a plain number string', () => {
      expect(formatCellValue('1234', 'number')).toBe('1,234')
    })

    it('returns original value for non-numeric input', () => {
      expect(formatCellValue('abc', 'number')).toBe('abc')
    })
  })

  describe('currency format', () => {
    it('formats a number as USD currency', () => {
      expect(formatCellValue('49.99', 'currency')).toBe('$49.99')
    })

    it('returns original value for non-numeric input', () => {
      expect(formatCellValue('abc', 'currency')).toBe('abc')
    })
  })

  describe('percentage format', () => {
    it('formats a number as a percentage', () => {
      const result = formatCellValue('0.15', 'percentage')
      expect(result).toContain('15')
    })

    it('treats values > 1 as already-integer percentages', () => {
      const result = formatCellValue('25', 'percentage')
      expect(result).toContain('25')
    })

    it('returns original value for non-numeric input', () => {
      expect(formatCellValue('abc', 'percentage')).toBe('abc')
    })
  })

  describe('date format', () => {
    it('formats a date string', () => {
      const result = formatCellValue('2024-01-15', 'date')
      expect(result).toContain('Jan')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })

    it('returns original value for invalid date', () => {
      expect(formatCellValue('not-a-date', 'date')).toBe('not-a-date')
    })
  })
})

describe('getContrastText', () => {
  it('returns white for dark backgrounds', () => {
    expect(getContrastText('#000000')).toBe('#ffffff')
    expect(getContrastText('#1E40AF')).toBe('#ffffff')
  })

  it('returns dark for light backgrounds', () => {
    expect(getContrastText('#ffffff')).toBe('#111827')
    expect(getContrastText('#F9FAFB')).toBe('#111827')
  })
})
