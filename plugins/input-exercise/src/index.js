import plugin from './plugin'
import * as React from 'react'
import Textfield from './Textfield'

export default {
  ...plugin,
  Component: Textfield,
  IconComponent: <img src={null} />,
  text: 'Eingabefeld',
  createInitialState: () => ({
    type: 'Text',
    correctValue: '',
    wrongAnswers: []
  })
}
