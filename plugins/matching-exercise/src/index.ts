import { MatchingExercisePluginState } from '@serlo/editor-plugin-matching-exercise-renderer'
import { createDocumentIdentifier, Plugin } from '@splish-me/editor'

import { MatchingExerciseEditor } from './editor'

export const matchingExercisePlugin: Plugin<MatchingExercisePluginState> = {
  Component: MatchingExerciseEditor,

  text: 'Matching Exercise',
  createInitialState: (): MatchingExercisePluginState => ({
    solution: [],
    blockContent: [createDocumentIdentifier()]
  })
}
