import * as React from 'react'
import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor-core/src/editable.component'
import Display from './Display'
import Feedback from '../../helper-feedback/src/Feedback'
import { renderIntoSidebar } from '@splish-me/editor-ui/src/plugin-sidebar.component'
import Dropdown from '@splish-me/editor-ui/src/sidebar-elements/dropdown'
import SBTextfield from '@splish-me/editor-ui/src/sidebar-elements/textfield'
import './index.css'
import * as R from 'ramda'

export default class Textfield extends React.Component {
  handleTypeChange = event => {
    const value = event.target.value
    const { onChange } = this.props
    onChange({
      type: value
    })
  }
  setCorrectValue = event => {
    const target = event.target
    const value = target.value
    const { onChange } = this.props
    onChange({
      correctValue: value
    })
  }
  addWrongAnswer = _event => {
    const { onChange, state } = this.props
    const { wrongAnswers } = state
    console.log(wrongAnswers)
    onChange({
      wrongAnswers: [
        ...wrongAnswers,
        {
          id: createEditableIdentifier(),
          value: '',
          feedback: createEditableIdentifier()
        }
      ]
    })
  }
  removeAnswer = _event => {
    const { state, index, onChange } = this.props
    onChange({
      wrongAnswers: R.remove(index, 1, state.wrongAnswers)
    })
  }
  wrongAnswerChange = event => {
    const target = event.target
    const value = target.value

    const { state, onChange } = this.props
    const newAnswer = {
      ...state.wrongAnswers[index],
      value: value
    }

    onChange({
      wrongAnswers: R.update(index, newAnswer, state.wrongAnswers)
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
                  label="Wähle den Antworttyp:"
                  options={['Text', 'Zahl', 'Ausdruck']}
                  onChange={this.handleTypeChange}
                  selectedValue={type}
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
            {wrongAnswers.map((wrongAnswer, index) => {
              return (
                <div key={index}>
                  <label>
                    falsche Antwort:
                    <input
                      type="text"
                      value={wrongAnswers.value}
                      placeholder="falsche Antwort eingeben"
                      onChange={this.wrongAnswerChange}
                    />
                  </label>
                  <button onClick={this.removeAnswer}>
                    Löschen {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
                  </button>
                  {wrongAnswer.feedback ? (
                    <Feedback>
                      <Editable id={wrongAnswer.feedback} />
                    </Feedback>
                  ) : null}
                </div>
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
