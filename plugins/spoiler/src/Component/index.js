import React, { Component } from 'react'
import { Editable } from '@splish-me/editor-core/lib/editable.component'

export default class PluginComponent extends Component {
  state = { hidden: true }

  onToggle = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const { state, children, readOnly, onChange } = this.props
    console.log('this is a spoiler', state)

    return (
      <div className="ory-plugins-layout-spoiler">
        <div
          className="ory-plugins-layout-spoiler-toggle"
          onClick={this.onToggle}
        >
          {this.state.hidden ? (
            <span className="fa fa-caret-square-o-down" />
          ) : (
            <span className="fa fa-caret-square-o-up" />
          )}
          {readOnly ? (
            state.title
          ) : (
            <input
              className="ory-plugins-layout-spoiler-toggle-title"
              // floatingLabelStyle={{ color: 'black' }}
              // disabled={readOnly}
              onChange={e => onChange({ title: e.target.value })}
              value={state.title}
              placeholder="Your Title Here"
            />
          )}
        </div>

        <div
          className="ory-plugins-layout-spoiler-content"
          style={{
            display: this.state.hidden && readOnly ? 'none' : 'block'
          }}
        >
          <Editable id={state.content} />
        </div>
      </div>
    )
  }
}
