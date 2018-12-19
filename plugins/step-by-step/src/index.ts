import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

import { EquationsEditable } from './editable.component'
import { EquationsProps } from './equations.component'
import { plugin } from './plugin'

export default {
  ...plugin,
  Component: EquationsEditable,
  text: 'Step by Step',

  createInitialState: (): EquationsProps['state'] => {
    return {
      steps: [
        {
          type: 'step',
          content: createEditableIdentifier(),
          explanation: createEditableIdentifier()
        }
      ]
    }
  }
}
