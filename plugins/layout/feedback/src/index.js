import React from 'react'
import Quote from 'material-ui/svg-icons/communication/comment'
import Feedback from './Feedback'
import plugin from './plugin'
import uuid from 'uuid'

export default ({ defaultPlugin }) => ({
  ...plugin,
  Component: Feedback,
  IconComponent: <Quote />,
  text: 'Feedback',
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
