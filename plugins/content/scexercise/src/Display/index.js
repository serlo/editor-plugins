import { Editable } from '@splish-me/editor/dist/editable.component'
import * as React from 'react'

import '../index.css'
import SCButton from '../Button/SCButton'

export default class Display extends React.Component {
  render() {
    const { state } = this.props
    const { answers } = state
    return (
      <React.Fragment>
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
