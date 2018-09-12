import * as React from 'react'

import Blockquote from './blockquote'
import plugin from './plugin'
import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

export default {
  ...plugin,
  Component: Blockquote,
  text: 'Blockquote',

  createInitialState: () => ({
    child: createEditableIdentifier()
  })
}
