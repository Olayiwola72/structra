import { describe, expect, it } from 'vitest'
import { exportTable } from '../../services/exportService'

describe('exportService', () => {
  it('exports a function named exportTable', () => {
    expect(typeof exportTable).toBe('function')
  })
})
