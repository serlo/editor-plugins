import React, { Component } from 'react'
import { Editable } from '@splish-me/editor-core/src/editable.component'
import { css } from 'emotion'
export default class Solution extends Component {
  state = { hidden: false }

  onToggle = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const { state, readOnly, onChange } = this.props

    return (
      <div
        className={css({
          marginTop: '12px',
          marginBottom: '20px',
          border: this.state.hidden ? 'none' : '1px solid #d9edf7',
          borderRadius: '2px',
          boxShadow: this.state.hidden
            ? 'none'
            : '0 1px 1px rgba(0, 0, 0, 0.05)'
        })}
      >
        <div
          className={css({
            backgroundColor: this.state.hidden ? 'transparent' : '#d9edf7',
            padding: '10px 15px 10px 10px',
            borderColor: this.state.hidden ? 'transparent' : '#d9edf7',
            textAlign: 'left',
            cursor: 'pointer'
          })}
          onClick={this.onToggle}
        >
          {readOnly ? (
            <a>
              Lösung {state.title}
              {this.state.hidden ? (
                <span className="fa fa-caret-down" />
              ) : (
                <span className="fa fa-caret-up" />
              )}
            </a>
          ) : (
            <div>
              <span> Lösung </span>
              <input
                className="ory-plugins-layout-solution-toggle-title"
                // floatingLabelStyle={{ color: 'black' }}
                // disabled={readOnly}

                onChange={e => onChange({ title: e.target.value })}
                value={state.title}
                placeholder="Optionaler Lösungsname"
              />
            </div>
          )}
        </div>

        <div
          className="ory-plugins-layout-solution-content"
          style={{
            display: this.state.hidden ? 'none' : 'block'
          }}
        >
          <Editable id={state.id} />
        </div>
      </div>
    )
  }
}
