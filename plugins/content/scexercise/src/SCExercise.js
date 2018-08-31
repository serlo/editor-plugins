import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor/dist/editable.component'
import * as React from 'react'
import Display from './Display'
import SCButton from './Button/SCButton'
import Feedback from '../../helper-feedback/src/Feedback'
import { renderIntoSidebar } from '@splish-me/editor-ui/dist/plugin-sidebar.component'
import Dropdown from '@splish-me/editor-ui/dist/sidebar-elements/dropdown'
import './index.css'
import * as R from 'ramda'

export default class SCEXercise extends React.Component {
  handleCheckboxChange = index => event => {
    const target = event.target
    const value = target.checked
    const name = target.name

    const { state, onChange } = this.props

    const newAnswer = {
      ...state.answers[index],
      isCorrect: value
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
    const { isSingleChoice } = this.props.state
    console.log(event.target.value)
    let helper
    if (event.target.value === 'Single Choice') {
      helper = true
    } else helper = false
    console.log(isSingleChoice)
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
    const { answers, isSingleChoice = true } = state

    return (
      <React.Fragment>
        {focused
          ? renderIntoSidebar(
              <Dropdown
                label="Select the exercise type"
                options={['Single Choice', 'Multiple Choice']}
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
                <React.Fragment>
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
                    {...this.props}
                  >
                    <Editable id={answer} />
                  </SCButton>
                  {answer.feedback ? (
                    <Feedback>
                      <Editable id={answer.feedback} />
                    </Feedback>
                  ) : null}
                </React.Fragment>
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
