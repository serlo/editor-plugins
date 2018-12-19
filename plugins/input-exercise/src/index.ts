import { plugin } from './plugin'
import { InputExerciseEditor } from './editor.component'

export default {
  ...plugin,
  text: 'Eingabefeld',
  Component: InputExerciseEditor,
  createInitialState: () => ({
    type: 'Text',
    correctValue: '',
    wrongAnswers: []
  })
}
