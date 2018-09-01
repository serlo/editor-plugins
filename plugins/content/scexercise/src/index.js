import { createEditableIdentifier } from '@splish-me/editor-core/src/editable.component'
import * as React from 'react'

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
