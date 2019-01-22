import { ScMcExercisePluginState } from '@serlo/editor-plugin-sc-mc-exercise-renderer'
import { createDocumentIdentifier, Plugin } from '@splish-me/editor'

import { ScMcExerciseEditor } from './editor'

export const scMcExercisePlugin: Plugin<ScMcExercisePluginState> = {
  Component: ScMcExerciseEditor,
  text: 'Single Choice Aufgabe',
  createInitialState: (): ScMcExercisePluginState => {
    return {
      isSingleChoice: false,
      answers: [
        {
          id: createDocumentIdentifier(),
          isCorrect: false,
          feedback: null
        }
      ]
    }
  }
}
