import Tipp from './Tipp'
import plugin from './plugin'
import { createEditableIdentifier } from '@splish-me/editor-core/src/editable.component'

export default {
  ...plugin,
  Component: Tipp,
  text: 'Tipp',
  createInitialState: () => ({
    title: '',
    id: createEditableIdentifier()
  })
}
