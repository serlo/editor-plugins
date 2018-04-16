import InfoIcon from 'material-ui-icons/Code'
import React from 'react'

import Highlight from './Component'
import plugin from './plugin'

export default {
  ...plugin,
  Component: Highlight,
  IconComponent: <InfoIcon />,
  text: 'Code Highlight'
}
