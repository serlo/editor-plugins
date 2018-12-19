import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'
import { plugin } from './plugin'
import { License } from './license.component'

export default {
  ...plugin,
  text: 'Lizenzangabe',
  Component: License,
  createInitialState: () => ({
    license: 0,
    content: createEditableIdentifier()
  })
}

