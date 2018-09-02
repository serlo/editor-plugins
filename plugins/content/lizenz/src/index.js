import { createEditableIdentifier } from '@splish-me/editor-core/src/editable.component'
import * as React from 'react'

import Lizenz from './Lizenz'
import plugin from './plugin'

export default {
  ...plugin,
  Component: Lizenz,
  text: 'Lizenzangabe',
  createInitialState: () => ({
    license: 0,
    content: createEditableIdentifier()
  })
}
