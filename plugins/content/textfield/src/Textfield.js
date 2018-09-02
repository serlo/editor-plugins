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
import { css } from 'emotion'
import * as R from 'ramda'

const types = [
  {
    name: 'Text',
    type: 'input-string-normalized-match-challenge'
  },
  {
    name: 'Zahl',
    type: 'input-number-exact-match-challenge'
  },
  {
    name: 'Ausdruck',
    type: 'input-expression-equal-match-challenge'
  }
]

export default class Textfield extends React.Component {
  translateDataType(type) {
    for (let i = 0; i < types.length; i++) {
      if (type === types[i].type) return types[i].name
    }
  }
  translateDataName(name) {
    for (let i = 0; i < types.length; i++) {
      if (name === types[i].name) return types[i].type
    }
  }

  handleTypeChange = event => {
    const value = event.target.value
    const { onChange } = this.props
    onChange({
      type: this.translateDataName(value)
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
  removeAnswer = index => _event => {
    const { state, onChange } = this.props
    onChange({
      wrongAnswers: R.remove(index, 1, state.wrongAnswers)
    })
  }
  wrongAnswerChange = index => event => {
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
                  options={R.map(dataType => dataType.name, types)}
                  onChange={this.handleTypeChange}
                  value={this.translateDataType(type)}
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
                      value={wrongAnswer.value}
                      placeholder="falsche Antwort eingeben"
                      onChange={this.wrongAnswerChange(index)}
                    />
                  </label>
                  <button onClick={this.removeAnswer(index)}>
                    Löschen {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
                  </button>
                  {wrongAnswer.feedback ? (
                    <label className={css({ clear: 'both' })}>
                      Feedback:
                      <Feedback>
                        <Editable id={wrongAnswer.feedback} />
                      </Feedback>
                    </label>
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
