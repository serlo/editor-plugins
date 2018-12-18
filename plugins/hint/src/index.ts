import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

import { HintEditor } from './editor.component'
import { plugin } from './plugin'
import { HintPluginState } from './types'

export default {
  ...plugin,
  Component: HintEditor,
  text: 'Tipp',
  createInitialState: (): HintPluginState => ({
    content: createEditableIdentifier()
  })
}
