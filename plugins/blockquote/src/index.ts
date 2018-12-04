import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

import { plugin } from './plugin'
import { BlockquotePluginState } from './types'
import { BlockquoteRenderer }from './renderer.component'

export default {
  ...plugin,
  Component: BlockquoteRenderer,
  text: 'Blockquote',

  createInitialState: (): BlockquotePluginState => ({
    child: createEditableIdentifier()
  })
}
