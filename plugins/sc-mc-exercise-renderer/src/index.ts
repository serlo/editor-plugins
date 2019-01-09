import { DocumentIdentifier } from '@splish-me/editor-core-types'

import { ScMcExerciseRenderer } from './renderer'

export const scMcExerciseRendererPlugin = {
  name: '@serlo-org/sc-mc-exercise',
  version: '0.0.4',
  Component: ScMcExerciseRenderer
}

export interface ScMcExercisePluginState {
  answers: Answer[]
  isSingleChoice: boolean
}

export interface Answer {
  isCorrect: boolean
  feedback: DocumentIdentifier
  id: DocumentIdentifier
}

export * from './choice-renderer'
export * from './renderer'
