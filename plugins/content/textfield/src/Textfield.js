import * as React from 'react'
import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor/dist/editable.component'
import Display from './Display'
import Feedback from '../../helper-feedback/src/Feedback'
import { renderIntoSidebar } from '@splish-me/editor-ui/dist/plugin-sidebar.component'
import Dropdown from '@splish-me/editor-ui/dist/sidebar-elements/dropdown'
import SBTextfield from '@splish-me/editor-ui/dist/sidebar-elements/textfield'
import './index.css'

export default class Textfield extends React.Component {
  handleTypeChange = event => {
    //TODO: Typen
  }
  setCorrectValue = event => {
    const target = event.target
    const value = target.value
    const { onChange } = this.props
    onChange({
      correctValue: value
    })
  }
  render() {
    const { readOnly, state, focused } = this.props
    const { correctValue, wrongAnswers, type } = state

    return (
      <React.Fragment>
        {focused
          ? renderIntoSidebar(
              <React.Fragment>
                <Dropdown
                  label="select answertype"
                  options={['Text', 'Zahl']}
                  onChange={this.handleTypeChange}
                />
                <SBTextfield
                  label="richtige Antwort:"
                  value={correctValue}
                  onChange={this.setCorrectValue}
                />
              </React.Fragment>
            )
          : null}
        {readOnly ? (
          <Display {...this.props} />
        ) : (
          <React.Fragment>
            <Display {...this.props} />
            {wrongAnswers.map((wrongAnswers, index) => {
              return (
                <React.Fragment>
                  <label>
                    falsche Antwort:
                    <input
                      type="text"
                      value={wrongAnswers.value}
                      placeholder="falsche Antwort eingeben"
                      onChange={this.wrongAnswerChange}
                    />
                  </label>
                  <Feedback>
                    <Editable id={answer.feedback} />
                  </Feedback>
                </React.Fragment>
              )
            })}
            <button onClick={this.addWrongAnswer}>
              Falsche Antwort hinzufügen
            </button>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}
