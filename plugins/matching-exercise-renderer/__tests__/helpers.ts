import { createDocumentIdentifier } from '@splish-me/editor'

import { createBlocks, combineBlocks, isCorrect } from '../src/helpers'
import {
  MatchingExercisePluginState,
  MatchingExerciseRendererState
} from '../src'

describe('Matching Exercise: isCorrect', () => {
  test('empty state', () => {
    const pluginState: MatchingExercisePluginState = {
      solution: [],
      blockContent: []
    }
    const state: MatchingExerciseRendererState = {
      leftSide: [],
      rightSide: [],
      stack: []
    }
    expect(isCorrect(pluginState, state)).toEqual(true)
  })

  test('one incorrect pair', () => {
    const pluginState: MatchingExercisePluginState = {
      solution: [],
      blockContent: []
    }
    const state: MatchingExerciseRendererState = {
      leftSide: [createBlocks(0, 'left')],
      rightSide: [createBlocks(1, 'right')],
      stack: []
    }
    expect(isCorrect(pluginState, state)).toEqual(false)
  })

  test('one swapped pair', () => {
    const pluginState: MatchingExercisePluginState = {
      solution: [[0, 1]],
      blockContent: []
    }
    const state: MatchingExerciseRendererState = {
      leftSide: [createBlocks(1, 'left')],
      rightSide: [createBlocks(0, 'right')],
      stack: []
    }
    expect(isCorrect(pluginState, state)).toEqual(false)
  })

  test('one missing pair', () => {
    const pluginState: MatchingExercisePluginState = {
      solution: [[0, 1]],
      blockContent: []
    }
    const state: MatchingExerciseRendererState = {
      leftSide: [],
      rightSide: [],
      stack: [createBlocks(0, 'stack'), createBlocks(1, 'stack')]
    }
    expect(isCorrect(pluginState, state)).toEqual(false)
  })

  test('duplicate in right side', () => {
    const pluginState: MatchingExercisePluginState = {
      solution: [[1, 2], [0, 2]],
      blockContent: []
    }
    const state: MatchingExerciseRendererState = {
      leftSide: [createBlocks(0, 'left-0'), createBlocks(1, 'left-1')],
      rightSide: [createBlocks(2, 'right-0'), createBlocks(2, 'right-1')],
      stack: []
    }
    expect(isCorrect(pluginState, state)).toEqual(true)
  })

  test('duplicate in left side', () => {
    const pluginState: MatchingExercisePluginState = {
      solution: [[0, 1], [0, 2]],
      blockContent: []
    }
    const state: MatchingExerciseRendererState = {
      leftSide: [createBlocks(0, 'left-0'), createBlocks(0, 'left-1')],
      rightSide: [createBlocks(1, 'right-0'), createBlocks(2, 'right-1')],
      stack: []
    }
    expect(isCorrect(pluginState, state)).toEqual(true)
  })

  test('unmatched pair', () => {
    const pluginState: MatchingExercisePluginState = {
      solution: [[0, 1], [0, 2]],
      blockContent: []
    }
    const state: MatchingExerciseRendererState = {
      leftSide: [createBlocks(0, 'left-0'), createBlocks(0, 'left-1')],
      rightSide: [
        createBlocks(1, 'right-0'),
        createBlocks(2, 'right-1'),
        createBlocks(3, 'right-2')
      ],
      stack: []
    }
    expect(isCorrect(pluginState, state)).toEqual(false)
  })
})

describe('Matching Exercise: generateBlocks', () => {
  test('empty state', () => {
    const blocks = combineBlocks({
      solution: [],
      blockContent: []
    })

    expect(blocks).toEqual([])
  })

  test('one solution', () => {
    const blocks = combineBlocks({
      solution: [[0, 1]],
      blockContent: [createDocumentIdentifier(), createDocumentIdentifier()]
    })

    expect(blocks.sort()).toEqual([0, 1].sort())
  })

  test('two solutions', () => {
    const blocks = combineBlocks({
      solution: [[0, 1], [1, 2]],
      blockContent: [
        createDocumentIdentifier(),
        createDocumentIdentifier(),
        createDocumentIdentifier()
      ]
    })

    expect(blocks.sort()).toEqual([0, 1, 1, 2].sort())
  })

  test('two solutions, one missing block', () => {
    const blocks = combineBlocks({
      solution: [[0, 1], [1, 2]],
      blockContent: [
        createDocumentIdentifier(),
        createDocumentIdentifier(),
        createDocumentIdentifier(),
        createDocumentIdentifier()
      ]
    })

    expect(blocks.sort()).toEqual([0, 1, 1, 2, 3].sort())
  })
})
