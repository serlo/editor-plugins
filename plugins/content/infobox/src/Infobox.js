import React from 'react'
import { Editable } from '@splish-me/editor/dist/editable.component'

export default class Infobox extends React.Component {
  render() {
    const { state } = this.props
    return (
      <div className="ory-editor-plugins-infobox">
        <Editable id={state.child} />
      </div>
    )
  }
}
