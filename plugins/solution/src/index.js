import Solution from './Solution'
import plugin from './plugin'
import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

export default {
  ...plugin,
  Component: Solution,
  text: 'Aufgabenlösung',
  createInitialState: () => ({
    title: '',
    id: createEditableIdentifier()
  })
}
