import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'
import Display from './Display'
import SCButton from './Button/SCButton'
import Feedback from './Feedback'
import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import Dropdown from '@splish-me/editor-ui/lib/sidebar-elements/dropdown'
import * as R from 'ramda'
import { css } from 'emotion'

export default class SCEXercise extends React.Component {
  handleCheckboxChange = index => event => {
    const target = event.target
    const value = target.checked

    const { state, onChange } = this.props
    const newAnswer = {
      ...state.answers[index],
      isCorrect: value,
      feedback: null
    }

    onChange({
      answers: R.update(index, newAnswer, state.answers)
    })
  }
  handleRadioButtonChange = rightanswerIndex => _event => {
    const { state, onChange } = this.props
    onChange({
      answers: state.answers.map((answer, index) => {
        return { ...answer, isCorrect: index === rightanswerIndex }
      })
    })
  }
  handleSCMCChange = event => {
    const { onChange, state } = this.props
    let helper
    if (event.target.value === 'Single Choice') {
      helper = true
    } else helper = false
    onChange({
      isSingleChoice: helper,
      answers: state.answers.map((answer, index) => {
        return { ...answer, isCorrect: false }
      })
    })
  }
  addButton = () => {
    const { onChange, state } = this.props

    onChange({
      answers: [
        ...state.answers,
        {
          id: createEditableIdentifier(),
          isCorrect: false,
          feedback: null
        }
      ]
    })
  }

  render() {
    const { readOnly, state, focused } = this.props
    const { answers, isSingleChoice, globalFeedback } = state

    return (
      <React.Fragment>
        {focused
          ? renderIntoSidebar(
              <Dropdown
                label="Select the exercise type"
                options={['Single Choice', 'Multiple Choice']}
                value={isSingleChoice ? 'Single Choice' : 'Multiple Choice'}
                onChange={this.handleSCMCChange}
              />
            )
          : null}
        {readOnly ? (
          <Display {...this.props} />
        ) : (
          <React.Fragment>
            <hr />
            {answers.map((answer, index) => {
              return (
                <div key={index}>
                  <label className="float">
                    richtige Antwort
                    {isSingleChoice ? (
                      <input
                        checked={answer.isCorrect}
                        className="checkboxstyle"
                        type="radio"
                        name="scRadio"
                        onChange={this.handleRadioButtonChange(index)}
                      />
                    ) : (
                      <input
                        checked={answer.isCorrect}
                        className="checkboxstyle"
                        type="checkbox"
                        onChange={this.handleCheckboxChange(index)}
                      />
                    )}
                  </label>

                  <SCButton
                    removeButton={this.removeButton}
                    key={index}
                    index={index}
                    isSingleChoice={isSingleChoice}
                    focused={focused}
                    {...this.props}
                  >
                    <Editable id={answer} />
                  </SCButton>
                  {answer.feedback ? (
                    <Feedback>
                      <Editable id={answer.feedback} />
                    </Feedback>
                  ) : null}
                </div>
              )
            })}

            <div
              className={css({
                textAlign: 'center'
              })}
            >
              <button
                onClick={this.addButton}
                className={css({
                  borderRadius: '50%',
                  fontSize: '20px',
                  outline: 'none',
                  width: '35px',
                  height: '35px',
                  border: 'none',
                  margin: 'auto'
                })}
              >
                +
              </button>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}
