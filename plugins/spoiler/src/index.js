import Component from './Component'
import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'
import plugin from './plugin'

export default {
  ...plugin,
  Component: Component,

  text: 'Hidden Text',

  createInitialState: () => ({
    content: createEditableIdentifier(),
    title: ''
  })
}
