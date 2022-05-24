import { Acronym } from './acronym.entity'

describe('Acronym Entity Unit Tests', () => {
  it('Should throws if title param is not provided', () => {
    expect(() => {
      const sut = new Acronym('', 'Any Acronym')
      expect(sut).toBeUndefined()
    }).toThrowError(new Error('Must have title as string'))
  })

  it('Should throws if definition param is not provided', () => {
    expect(() => {
      const sut = new Acronym('ANY_ACRONYM', '')
      expect(sut).toBeUndefined()
    }).toThrowError(new Error('Must have definition as string'))
  })
})
