import * as React from 'react'

import Geogebra from './Component'
import plugin from './plugin'

export default {
  ...plugin,
  Component: Geogebra,
  text: 'Geogebra'
}
