import React, { Component } from 'react'
import { Editable } from '@splish-me/editor-core/lib/editable.component'
import { css } from 'emotion'

export default class Tipp extends Component {
  state = { hidden: true }

  onToggle = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const { state, children, readOnly, onChange } = this.props

    return (
      <div
        className={css({
          marginTop: '12px',
          marginBottom: '20px',
          border: '1px solid #ddd',
          borderRadius: '2px',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.05)'
        })}
      >
        <div
          className={css({
            padding: '10px 15px 10px 10px',
            borderColor: '#ddd',
            textAlign: 'left',
            cursor: 'pointer',
            borderBottom: '1px solid #ddd'
          })}
          onClick={this.onToggle}
        >
          {readOnly ? (
            <span>
              Tipp
              <span
                className={cx(
                  'fa',
                  this.state.hidden ? 'fa-caret-down' : 'fa-caret-up',
                  css({
                    bottom: '13px',
                    left: '15px',
                    marginLeft: '5px'
                  })
                )}
              />
            </span>
          ) : (
            <span> Tipp </span>
          )}
        </div>
        <div
          className={css({
            padding: '15px',
            display: this.state.hidden && readOnly ? 'none' : 'block'
          })}
        >
          <Editable id={state.id} />
        </div>
      </div>
    )
  }
}
