import createClassName from 'classnames'
import * as R from 'ramda'
import React, { Component } from 'react'

import './index.css'

export default class SCButton extends Component {
  handleCheckboxChange = event => {
    const target = event.target

    // TODO: only needed when we have radio button, too
    const value = target.type === 'checkbox' ? target.checked : target.value

    const { state, onChange, index } = this.props

    const newAnswer = {
      ...state.answers[index],
      isCorrect: value
    }

    onChange({
      answers: R.update(index, newAnswer, state.answers)
    })
  }

  render() {
    const { readOnly, state, children, index } = this.props

    // FIXME:
    const checkMode = true
    const { isCorrect } = state.answers[index]
    const isSelected = true

    // TODO:
    const className = createClassName('button-whatever', {
      'button-true': isCorrect
    })

    return (
      <React.Fragment>
        {readOnly ? null : (
          <label>
            richtige Antwort
            <input
              checked={isCorrect}
              className="checkboxstyle"
              type="checkbox"
              onChange={this.handleCheckboxChange}
            />
          </label>
        )}
        <React.Fragment>
          {checkMode ? (
            isCorrect ? (
              <div className="button-true">{children}</div>
            ) : (
              <div className="button-false">{children}</div>
            )
          ) : isSelected ? (
            <div className="button-active">{children}</div>
          ) : (
            <div className="button-default"> {children}</div>
          )}
        </React.Fragment>
      </React.Fragment>
    )
  }
}
