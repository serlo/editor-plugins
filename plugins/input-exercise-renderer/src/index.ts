import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'

import { InputExerciseRenderer } from './renderer'

export const inputExerciseRendererPlugin: RendererPlugin<
  InputExercisePluginState
> = {
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

export * from './renderer'
