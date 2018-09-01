import createClassName from 'classnames'
import * as R from 'ramda'
import React, { Component } from 'react'
import { createEditableIdentifier } from '@splish-me/editor-core/src/editable.component'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

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

  addFeedback = event => {
    const { state, onChange, index } = this.props
    const newAnswer = {
      ...state.answers[index],
      feedback: state.answers[index].feedback
        ? null
        : createEditableIdentifier()
    }
    onChange({
      answers: R.update(index, newAnswer, state.answers)
    })
  }

  removeAnswer = event => {
    const { state, index, onChange } = this.props
    onChange({
      answers: R.remove(index, 1, state.answers)
    })
  }

  render() {
    const {
      readOnly,
      state,
      children,
      index,
      isSingleChoice,
      handleCheckboxChange = this.handleCheckboxChange
    } = this.props

    // FIXME:
    const checkMode = true
    const { isCorrect, feedback } = state.answers[index]
    const isSelected = true

    // TODO:
    const className = createClassName('button-whatever', {
      'button-true': isCorrect
    })

    return (
      <React.Fragment>
        {readOnly ? null : (
          <div>
            <button onClick={this.removeAnswer}>
              L {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
            </button>
            {isCorrect ? null : (
              <button onClick={this.addFeedback}>
                {feedback ? 'Feedback entfernen' : 'Feedback hinzufügen'}
              </button>
            )}
          </div>
        )}
        <React.Fragment>
          <div>
            <button className="button-default"> {children} </button>
          </div>
        </React.Fragment>
      </React.Fragment>
    )
  }
}
