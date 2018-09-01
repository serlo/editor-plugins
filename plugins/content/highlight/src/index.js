import React from 'react'

import Highlight from './Component'
import plugin from './plugin'

export default {
  ...plugin,
  Component: Highlight,
  text: 'Code Highlight'
}
