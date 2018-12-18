import plugin from './plugin'
import * as React from 'react'
import Inputfield from './editable.component'

export default {
  ...plugin,
  Component: Inputfield,
  IconComponent: <img src={null} />,
  text: 'Eingabefeld',
  createInitialState: () => ({
    type: 'Text',
    correctValue: '',
    wrongAnswers: []
  })
}
