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

  it('Should returns a created acronym entity when all params are provided', () => {
    const sut = new Acronym('ANY_ACRONYM', 'Any Acronym')
    expect(sut).toBeDefined()
    expect({ title: sut.title, definition: sut.definition })
      .toEqual({ title: 'ANY_ACRONYM', definition: 'Any Acronym' })
  })
})
