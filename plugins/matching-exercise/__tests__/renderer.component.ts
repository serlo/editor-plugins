import { MatchingExerciseRendererState } from '../src/renderer.component'
import {
  generateBlocks,
  createBlocks,
  combineBlocks,
  isCorrect
} from '../src/helpers'
import { MatchingExercisePluginState } from '../src/editable.component'
import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

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
      leftSide: [createBlocks(0, 'left', pluginState)],
      rightSide: [createBlocks(1, 'right', pluginState)],
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
      leftSide: [createBlocks(1, 'left', pluginState)],
      rightSide: [createBlocks(0, 'right', pluginState)],
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
      stack: [
        createBlocks(0, 'stack', pluginState),
        createBlocks(1, 'stack', pluginState)
      ]
    }
    expect(isCorrect(pluginState, state)).toEqual(false)
  })

  test('duplicate in right side', () => {
    const pluginState: MatchingExercisePluginState = {
      solution: [[1, 2], [0, 2]],
      blockContent: []
    }
    const state: MatchingExerciseRendererState = {
      leftSide: [
        createBlocks(0, 'left-0', pluginState),
        createBlocks(1, 'left-1', pluginState)
      ],
      rightSide: [
        createBlocks(2, 'right-0', pluginState),
        createBlocks(2, 'right-1', pluginState)
      ],
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
      leftSide: [
        createBlocks(0, 'left-0', pluginState),
        createBlocks(0, 'left-1', pluginState)
      ],
      rightSide: [
        createBlocks(1, 'right-0', pluginState),
        createBlocks(2, 'right-1', pluginState)
      ],
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
      leftSide: [
        createBlocks(0, 'left-0', pluginState),
        createBlocks(0, 'left-1', pluginState)
      ],
      rightSide: [
        createBlocks(1, 'right-0', pluginState),
        createBlocks(2, 'right-1', pluginState),
        createBlocks(3, 'right-2', pluginState)
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
      blockContent: [createEditableIdentifier(), createEditableIdentifier()]
    })

    expect(blocks.sort()).toEqual([0, 1].sort())
  })

  test('two solutions', () => {
    const blocks = combineBlocks({
      solution: [[0, 1], [1, 2]],
      blockContent: [
        createEditableIdentifier(),
        createEditableIdentifier(),
        createEditableIdentifier()
      ]
    })

    expect(blocks.sort()).toEqual([0, 1, 1, 2].sort())
  })

  test('two solutions, one missing block', () => {
    const blocks = combineBlocks({
      solution: [[0, 1], [1, 2]],
      blockContent: [
        createEditableIdentifier(),
        createEditableIdentifier(),
        createEditableIdentifier(),
        createEditableIdentifier()
      ]
    })

    expect(blocks.sort()).toEqual([0, 1, 1, 2, 3].sort())
  })
})
