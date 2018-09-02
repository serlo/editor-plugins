import React, { Component } from 'react'
import { Editable } from '@splish-me/editor-core/src/editable.component'

export default class Tipp extends Component {
  state = { hidden: true }

  onToggle = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const { state, children, readOnly, onChange } = this.props

    return (
      <div className="ory-plugins-layout-tipp">
        <div
          className="ory-plugins-layout-tipp-toggle tipp"
          onClick={this.onToggle}
        >
          {readOnly ? (
            <span>
              Tipp
              {this.state.hidden ? (
                <span className="fa fa-caret-down" />
              ) : (
                <span className="fa fa-caret-up" />
              )}
            </span>
          ) : (
            <span> Tipp </span>
          )}
        </div>

        <div
          className="ory-plugins-layout-tipp-content"
          style={{
            display: this.state.hidden && readOnly ? 'none' : 'block'
          }}
        >
          <Editable id={state.id} />
        </div>
      </div>
    )
  }
}
