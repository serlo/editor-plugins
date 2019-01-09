import * as R from 'ramda'

import {
  Block as B,
  MatchingExercisePluginState,
  MatchingExerciseRendererState
} from '.'

export const generateBlocks = ({
  solution,
  blockContent
}: MatchingExercisePluginState): {
  usedBlocks: number[]
  unusedBlocks: number[]
} => {
  const s = solution as Array<number[]>
  const usedBlocks = ([] as number[]).concat(...s)

  const unusedBlocks = blockContent
    .map((_content, block) => {
      return block
    })
    .filter(block => {
      return usedBlocks.indexOf(block) < 0
    })

  return {
    usedBlocks: usedBlocks,
    unusedBlocks: unusedBlocks
  }
}

export const createBlocks = (blockNumber: number, index: string) => {
  return {
    id: `${index}`,
    block: blockNumber,
    content: blockNumber
  }
}

export const combineBlocks = (state: MatchingExercisePluginState) => {
  const { usedBlocks, unusedBlocks } = generateBlocks(state)
  return [...usedBlocks, ...unusedBlocks]
}

export const isCorrectPerRow = (
  pluginState: MatchingExercisePluginState,
  [left, right]: [B | undefined, B | undefined]
) => {
  if (left === undefined || right === undefined) {
    return false
  }

  let correct = true

  const found = pluginState.solution.findIndex(pair => {
    return pair[0] === left.block && pair[1] === right.block
  })

  if (found < 0) {
    correct = false
  } else {
    correct
  }
  return correct
}

export const isCorrect = (
  pluginState: MatchingExercisePluginState,
  state: MatchingExerciseRendererState
) => {
  if (state.leftSide.length !== state.rightSide.length) {
    return false
  }
  const entries = R.zip(state.leftSide, state.rightSide)
  const solutionCheck = entries.every(tuple => {
    return isCorrectPerRow(pluginState, tuple as [B, B])
  })
  const found = foundSolution(pluginState, state)
  return solutionCheck && found
}

export const foundSolution = (
  pluginState: MatchingExercisePluginState,
  state: MatchingExerciseRendererState
) => {
  const entries = R.zip(state.leftSide, state.rightSide)
  const foundSolutions = pluginState.solution.every(tuple => {
    const found = entries.findIndex(entrytuple => {
      return (
        tuple[0] === entrytuple[0].block && tuple[1] === entrytuple[1].block
      )
    })
    return found >= 0
  })
  return foundSolutions
}
