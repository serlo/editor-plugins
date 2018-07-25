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
    const {
      readOnly,
      state,
      children,
      index,
      removeButton,
      addFeedback,
      isSingleChoice
    } = this.props

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
          <div>
            <label>
              richtige Antwort
              {isSingleChoice ? (
                <input
                  checked={isCorrect}
                  className="checkboxstyle"
                  type="radio"
                  onChange={this.handleCheckboxChange}
                />
              ) : (
                <input
                  checked={isCorrect}
                  className="checkboxstyle"
                  type="checkbox"
                  onChange={this.handleCheckboxChange}
                />
              )}
            </label>
            <button onClick={removeButton}> Antwort entfernen </button>
            {isCorrect ? (
              <button onClick={addFeedback}> Feedback hinzufügen </button>
            ) : null}
          </div>
        )}
        <React.Fragment>
          <div>
            <button className="button-default"> {children} </button>
          </div>
          {/* {checkMode ? (
            isCorrect ? (
              <button className="button-true">{children}</button>
            ) : (
              <button className="button-false">{children}</button>
            )
          ) : isSelected ? (
            <button className="button-active">{children}</button>
          ) : (
            <button className="button-default"> {children}</button>
          )} */}
        </React.Fragment>
      </React.Fragment>
    )
  }
}
