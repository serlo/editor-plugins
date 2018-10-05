import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

import { ScMcEditable } from './editable.component'
import { plugin } from './plugin'

export default {
  ...plugin,
  Component: ScMcEditable,
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
