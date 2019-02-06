import { calculateLayoutOptions } from '../src/helpers'

describe('Sc-Mc-Exercise: calculateLayoutOptions', () => {
  test('zero elements', () => {
    const elements = 0
    expect(calculateLayoutOptions(elements)).toEqual([])
  })

  test('more than two options', () => {
    const elements = 8
    const trueOptions = [[1, 8], [2, 4], [4, 2], [8, 1]]
    expect(calculateLayoutOptions(elements)).toEqual(trueOptions)
  })

  test('only trivial options', () => {
    const elements = 5
    const trueOptions = [[1, 5], [5, 1]]
    expect(calculateLayoutOptions(elements)).toEqual(trueOptions)
  })
})
