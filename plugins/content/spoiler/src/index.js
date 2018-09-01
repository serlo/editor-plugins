import React from 'react'

import uuid from 'uuid'
import Component from './Component'
import { createEditableIdentifier } from '@splish-me/editor-core/src/editable.component'

export default {
  Component: Component,
  name: 'ory/editor/core/layout/spoiler',
  version: '0.0.1',

  text: 'Hidden Text',

  createInitialState: () => ({
    content: createEditableIdentifier()
  })
}
