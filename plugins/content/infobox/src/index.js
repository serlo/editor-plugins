import InfoIcon from 'material-ui-icons/Info'
import React from 'react'
import uuid from 'uuid'
import { createEditableIdentifier } from '@splish-me/editor/dist/editable.component'
import Infobox from './Infobox'
import plugin from './plugin'

export default {
  ...plugin,
  Component: Infobox,
  IconComponent: <InfoIcon />,
  text: 'Infobox',

  createInitialState: () => ({
    child: createEditableIdentifier()
  })
}
