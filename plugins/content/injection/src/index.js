import React from 'react'
import Injection from './Component'

export default {
  Component: Injection,
  name: 'serlo/content/injection',
  version: '0.0.1',
  text: 'Injection',
  createInitialState: () => {
    return {
      src: '',
      alt: ''
    }
  }
}
