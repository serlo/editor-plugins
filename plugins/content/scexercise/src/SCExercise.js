import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor/dist/editable.component'
import * as React from 'react'
import slate from 'ory-editor-plugins-slate'
//import * as uuid from 'uuid'
import Display from './Display'
import SCButton from './Button/SCButton'
import Feedback from '../../helper-feedback/src/Feedback'
import { renderIntoSidebar } from '@splish-me/editor-ui/dist/plugin-sidebar.component'
import Dropdown from '@splish-me/editor-ui/dist/sidebar-elements/dropdown'
import './index.css'

export default class SCEXercise extends React.Component {
  handleCheckboxChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.props.onChange({
      [name]: value
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
      isSingleChoice: helper
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
            <form>
              {answers.map((answer, index) => {
                return (
                  <React.Fragment>
                    <label>
                      richtige Antwort
                      {isSingleChoice ? (
                        <input
                          checked={answer.isCorrect}
                          className="checkboxstyle"
                          type="radio"
                          onChange={answer.handleCheckboxChange}
                        />
                      ) : (
                        <input
                          checked={answer.isCorrect}
                          className="checkboxstyle"
                          type="checkbox"
                          onChange={answer.handleCheckboxChange}
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
            </form>

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
