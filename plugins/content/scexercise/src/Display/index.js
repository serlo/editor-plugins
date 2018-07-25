import { Editable } from '@splish-me/editor/dist/editable.component'
import * as React from 'react'

import '../index.css'
import SCButton from '../Button/SCButton'

export default class Display extends React.Component {
  render() {
    const { state } = this.props
    const { question, answers } = state
    return (
      <React.Fragment>
        <Editable id={question} />
        <hr />
        {answers.map((answer, index) => {
          return (
            <SCButton key={index} index={index} {...this.props}>
              <Editable id={answer} />
            </SCButton>
          )
        })}
      </React.Fragment>
    )
  }
}
