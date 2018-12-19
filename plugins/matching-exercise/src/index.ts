import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

import { MatchingExerciseEditable } from './editable.component'
import { plugin } from './plugin'

export default {
  ...plugin,
  Component: MatchingExerciseEditable,

  text: 'Matching Exercise',
  createInitialState: () => ({
    solution: [[0, 0]],
    blockContent: [createEditableIdentifier()]
  })
}
