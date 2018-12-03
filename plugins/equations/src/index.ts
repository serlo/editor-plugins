import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

import { EquationsEditable } from './editable.component'
import { plugin } from './plugin'

export default {
  ...plugin,
  Component: EquationsEditable,
  text: 'Gleichungssystem',
  createInitialState: () => ({})
}
