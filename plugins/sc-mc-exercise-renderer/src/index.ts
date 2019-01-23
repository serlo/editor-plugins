import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'

import { ScMcExerciseRenderer } from './renderer'

export const scMcExerciseRendererPlugin: RendererPlugin<
  ScMcExercisePluginState
> = {
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
