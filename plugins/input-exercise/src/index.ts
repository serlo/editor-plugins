import { InputExercisePluginState } from '@serlo/editor-plugin-input-exercise-renderer'
import { Plugin } from '@splish-me/editor'

import { InputExerciseEditor } from './editor'

export const inputExercisePlugin: Plugin<InputExercisePluginState> = {
  text: 'Eingabefeld',
  Component: InputExerciseEditor,
  createInitialState: (): InputExercisePluginState => ({
    type: 'Text',
    correctAnswers: [],
    wrongAnswers: []
  })
}
