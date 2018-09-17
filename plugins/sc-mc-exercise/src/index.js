import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

import SCExercise from './SCExercise'
import plugin from './plugin'

export default {
  ...plugin,
  Component: SCExercise,
  text: 'Single Choice Aufgabe',
  createInitialState: () => ({
    type: 'multiple',
    isSingleChoice: false,
    answers: [
      {
        id: createEditableIdentifier(),
        isCorrect: false,
        feedback: null
      }
    ]
  })
}
