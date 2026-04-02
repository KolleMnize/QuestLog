import { describe, it, expect, test } from 'vitest'
import { Guid } from './guid.value-object'

describe('Guid.constructor', () => {
  it('creates a Guid with the correct GuidV4 Syntax from a given string', () => {
    // Arrange 
    const guid = new Guid('123e4567-e89b-42d3-a456-426614174000')
    // Assert
    expect(guid.Value).toBe('123e4567-e89b-42d3-a456-426614174000')
  })
  it('throws an error when praramter is not GuidV4 Syntax', () => {
    // Arrange 
    expect(() => new Guid('not-a-valid-guid')).toThrow()
  })
})

describe('Guid.Equals', () => {
  it('returns true when comparing two Guids with the same value', () => {
    // Arrange
    const guid1 = new Guid('123e4567-e89b-42d3-a456-426614174000')
    const guid2 = new Guid('123e4567-e89b-42d3-a456-426614174000')
    // Assert
    expect(guid1.equals(guid2)).toBe(true)
  })
  it('returns false when comparing two Guids with different values', () => {
    // Arrange
    const guid1 = new Guid('123e4567-e89b-42d3-a456-426614174000')
    const guid2 = new Guid('123e4567-e89b-42d3-a456-426614174001')
    // Assert
    expect(guid1.equals(guid2)).toBe(false)
  })
})

describe('Guid.newGuid', () => {
  it('creates a random valid Guid', () => {
    // Arrange 
    const guid1 =  Guid.newGuid()
    const guid2 =  Guid.newGuid()
    // Assert
    expect(guid1.Value).not.toBe(guid2.Value)
  })
})