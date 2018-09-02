import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor-core/src/editable.component'
import * as React from 'react'
import Display from './Display'
import SCButton from './Button/SCButton'
import Feedback from '../../helper-feedback/src/Feedback'
import { renderIntoSidebar } from '@splish-me/editor-ui/src/plugin-sidebar.component'
import Dropdown from '@splish-me/editor-ui/src/sidebar-elements/dropdown'
import './index.css'
import * as R from 'ramda'

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
                selectedValue={
                  isSingleChoice ? 'Single Choice' : 'Multiple Choice'
                }
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

            <div className="center">
              <button onClick={this.addButton} className="addButton">
                +
              </button>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}
