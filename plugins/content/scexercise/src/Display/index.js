import { Editable } from '@splish-me/editor/dist/editable.component'
import * as React from 'react'

import '../index.css'

export default class Display extends React.Component {
  render() {
    const { handleValueChange, state } = this.props
    return (
      <React.Fragment>
        <Editable id={state.question} />
        <hr />
        <Editable id={state.answers} />
      </React.Fragment>
    )
  }
}
