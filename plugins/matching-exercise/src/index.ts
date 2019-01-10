import { MatchingExercisePluginState } from '@serlo/editor-plugin-matching-exercise-renderer'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'

import { MatchingExerciseEditor } from './editor'

export const matchingExercisePlugin = {
  name: '@serlo-org/matching-exercise',
  version: '0.0.0',
  Component: MatchingExerciseEditor,

  text: 'Matching Exercise',
  createInitialState: (): MatchingExercisePluginState => ({
    solution: [[0, 0]],
    blockContent: [createDocumentIdentifier()]
  })
}
