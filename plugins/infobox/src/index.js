import React from 'react'
import uuid from 'uuid'
import { createEditableIdentifier } from '@splish-me/editor-core/src/editable.component'
import Infobox from './Infobox'
import plugin from './plugin'

export default {
  ...plugin,
  Component: Infobox,
  text: 'Infobox',

  createInitialState: () => ({
    child: createEditableIdentifier()
  })
}
