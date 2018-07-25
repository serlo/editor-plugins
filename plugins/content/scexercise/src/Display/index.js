import { Editable } from '@splish-me/editor/dist/editable.component'
import slate from 'ory-editor-plugins-slate'
import * as React from 'react'

import '../index.css'

export default class Display extends React.Component {
  render() {
    const { state } = this.props
    return (
      <React.Fragment>
        <Editable defaultPlugin={slate} id={state.question} />
        <hr />
        <Editable id={state.answers} />
      </React.Fragment>
    )
  }
}
