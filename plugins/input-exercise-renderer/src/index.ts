import { DocumentIdentifier } from '@splish-me/editor-core-types'

import { InputExerciseRenderer } from './renderer'

export const inputExerciseRendererPlugin = {
  name: '@serlo-org/input-exercise',
  version: '0.0.3',
  Component: InputExerciseRenderer
}

export interface InputExercisePluginState {
  correctAnswers: CorrectAnswer[]
  wrongAnswers: WrongAnswer[]
  type: string
}

export interface WrongAnswer {
  id: DocumentIdentifier
  value: string
  feedback: DocumentIdentifier
}

export interface CorrectAnswer {
	value: string
}

export * from './renderer'
