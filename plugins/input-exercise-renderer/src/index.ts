import { DocumentIdentifier } from '@splish-me/editor-core-types'

import { InputExerciseRenderer } from './renderer'

export const inputExerciseRendererPlugin = {
  name: '@serlo-org/input-exercise',
  version: '0.0.3',
  Component: InputExerciseRenderer
}

export interface InputExercisePluginState {
  correctValue: string
  wrongAnswers: WrongAnswer[]
  type: string
}

export interface WrongAnswer {
  id: DocumentIdentifier
  value: string
  feedback: DocumentIdentifier
}

export * from './feedback'
export * from './renderer'
