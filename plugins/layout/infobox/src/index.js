import InfoIcon from 'material-ui-icons/Info'
import React from 'react'
import uuid from 'uuid'

import Infobox from './Infobox'
import plugin from './plugin'

export default ({ defaultPlugin }) => ({
  ...plugin,
  Component: Infobox,
  IconComponent: <InfoIcon />,
  text: 'Infobox',

  createInitialChildren: () => ({
    id: uuid(),
    rows: [
      {
        id: uuid(),
        cells: [
          {
            content: {
              plugin: defaultPlugin,
              state: defaultPlugin.createInitialState()
            },
            id: uuid()
          }
        ]
      }
    ]
  })
})
