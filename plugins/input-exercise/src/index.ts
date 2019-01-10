import { InputExercisePluginState } from '@serlo/editor-plugin-input-exercise-renderer'

import { InputExerciseEditor } from './editor'

export const inputExercisePlugin = {
  name: '@serlo-org/input-exercise',
  version: '0.0.3',
  text: 'Eingabefeld',
  Component: InputExerciseEditor,
  createInitialState: (): InputExercisePluginState => ({
    type: 'Text',
    correctValue: '',
    wrongAnswers: []
  })
}
