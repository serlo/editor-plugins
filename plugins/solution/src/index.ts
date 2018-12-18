import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

import { SolutionEditor } from './editor.component'
import { plugin } from './plugin'
import { SolutionPluginState } from './types'

export default {
  ...plugin,
  Component: SolutionEditor,
  text: 'Lösung',
  createInitialState: (): SolutionPluginState => ({
    content: createEditableIdentifier()
  })
}
