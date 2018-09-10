import React from 'react'
import Injection from './Component'

import { name, version } from '../package.json'

export default {
  Component: Injection,
  name: name.replace('editor-plugin-', ''),
  version,
  text: 'Injection',
  createInitialState: () => {
    return {
      src: '',
      alt: ''
    }
  }
}
