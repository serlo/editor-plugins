import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'

import { InputExerciseRenderer } from './renderer'

export const inputExerciseRendererPlugin: RendererPlugin<
  InputExercisePluginState
> = {
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
