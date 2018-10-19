import { State, isCorrect, generateBlocks } from '../src/renderer.component'

describe('Matching Exercise: isCorrect', () => {
  test('empty state', () => {
    const state: State = {
      leftSide: [],
      rightSide: [],
      stack: [],
      solution: []
    }

    expect(isCorrect(state)).toEqual(true)
  })

  test('one incorrect pair', () => {
    const state: State = {
      leftSide: [0],
      rightSide: [1],
      stack: [],
      solution: []
    }

    expect(isCorrect(state)).toEqual(false)
  })

  test('one swapped pair', () => {
    const state: State = {
      leftSide: [1],
      rightSide: [0],
      stack: [],
      solution: [[0, 1]]
    }

    expect(isCorrect(state)).toEqual(false)
  })

  test('one missing pair', () => {
    const state: State = {
      leftSide: [],
      rightSide: [],
      stack: [0, 1],
      solution: [[0, 1]]
    }

    expect(isCorrect(state)).toEqual(false)
  })

  test('duplicate in right side', () => {
    const state: State = {
      leftSide: [0, 1],
      rightSide: [2, 2],
      stack: [],
      solution: [[1, 2], [0, 2]]
    }

    expect(isCorrect(state)).toEqual(true)
  })

  test('duplicate in left side', () => {
    const state: State = {
      leftSide: [0, 0],
      rightSide: [1, 2],
      stack: [],
      solution: [[0, 1], [0, 2]]
    }

    expect(isCorrect(state)).toEqual(true)
  })

  test('unmatched pair', () => {
    const state: State = {
      leftSide: [0, 0],
      rightSide: [1, 2, 3],
      stack: [],
      solution: [[0, 1], [0, 2]]
    }

    expect(isCorrect(state)).toEqual(false)
  })
})

describe('Matching Exercise: generateBlocks', () => {
  test('empty state', () => {
    const blocks = generateBlocks({
      solution: [],
      blockContent: []
    })

    expect(blocks).toEqual([])
  })

  test('one solution', () => {
    const blocks = generateBlocks({
      solution: [[0, 1]],
      blockContent: [0, 1]
    })

    expect(blocks.sort()).toEqual(['0', '1'].sort())
  })

  test('two solutions', () => {
    const blocks = generateBlocks({
      solution: [[0, 1], [1, 2]],
      blockContent: [0, 1, 2]
    })

    expect(blocks.sort()).toEqual(['0', '1', '1', '2'].sort())
  })

  test('two solutions, one missing block', () => {
    const blocks = generateBlocks({
      solution: [[0, 1], [1, 2]],
      blockContent: [0, 1, 2, 3]
    })

    expect(blocks.sort()).toEqual(['0', '1', '1', '2', '3'].sort())
  })
})
