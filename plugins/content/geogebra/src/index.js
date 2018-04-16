import React from 'react'
import Panorama from 'material-ui/svg-icons/toggle/star'

import Geogebra from './Component'
import plugin from './plugin'

export default {
  ...plugin,
  Component: Geogebra,
  IconComponent: <Panorama />,
  text: 'Geogebra'
}
