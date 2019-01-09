import { ScMcExercisePluginState } from '@serlo-org/editor-plugin-sc-mc-exercise-renderer'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'

import { ScMcExerciseEditor } from './editor'

export const scMcExercisePlugin = {
  name: '@serlo-org/sc-mc-exercise',
  version: '0.0.4',
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
