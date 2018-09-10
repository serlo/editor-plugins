import React from 'react'
import { Editable } from '@splish-me/editor-core/src/editable.component'

export default class Infobox extends React.Component {
  render() {
    const { state } = this.props
    return (
      <blockquote>
        <Editable id={state.child} />
      </blockquote>
    )
  }
}
