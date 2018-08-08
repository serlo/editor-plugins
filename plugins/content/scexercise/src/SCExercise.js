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
    //TODO
  }

  removeButton = () => {
    //TODO
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
    const { readOnly, isSingleChoice, state, focused } = this.props
    const { answers } = state

    return (
      <React.Fragment>
        {focused
          ? renderIntoSidebar(
              <Dropdown
                options={['Single Choice', 'Multiple Choice']}
                onChange={handleSCMCChange}
              />
            )
          : null}
        {readOnly ? (
          <Display {...this.props} />
        ) : (
          <React.Fragment>
            <hr />
            {isSingleChoice ? (
              <div>
                {answers.map((answer, index) => {
                  return (
                    <SCButton
                      removeButton={this.removeButton}
                      key={index}
                      index={index}
                      {...this.props}
                    >
                      <Editable id={answer} />
                    </SCButton>
                  )
                })}
              </div>
            ) : (
              <div>
                {answers.map((answer, index) => {
                  return (
                    <React.Fragment>
                      <SCButton
                        removeButton={this.removeButton}
                        key={index}
                        index={index}
                        {...this.props}
                      >
                        <Editable id={answer.id} />
                      </SCButton>
                      {answer.feedback ? (
                        <Feedback>
                          <Editable id={answer.feedback} />
                        </Feedback>
                      ) : null}
                    </React.Fragment>
                  )
                })}
                <button onClick={this.addButton} className="addButton">
                  +
                </button>
              </div>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}
