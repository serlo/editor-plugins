import {
  InputExercisePluginState,
  InputExerciseRenderer,
  InputExerciseRendererProps,
  WrongAnswer
} from '@serlo/editor-plugin-input-exercise-renderer'
import { Feedback, styled } from '@serlo/editor-ui'
import { Document, createDocumentIdentifier } from '@splish-me/editor'
import { Dropdown, Input, renderIntoSidebar } from '@splish-me/editor-ui'
import * as R from 'ramda'
import * as React from 'react'

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

export class InputExerciseEditor extends React.Component<
  InputExerciseEditorProps
> {
  translateDataType(type: string) {
    for (let i = 0; i < types.length; i++) {
      if (type === types[i].type) return types[i].name
    }
    return ''
  }
  translateDataName(name: string) {
    for (let i = 0; i < types.length; i++) {
      if (name === types[i].name) return types[i].type
    }
    return ''
  }

  handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    const { onChange } = this.props
    onChange({
      type: this.translateDataName(value)
    })
  }
  setCorrectValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    const value = target.value
    const { onChange } = this.props
    onChange({
      correctValue: value
    })
  }
  addWrongAnswer = () => {
    const { onChange, state } = this.props
    const { wrongAnswers } = state
    console.log(wrongAnswers)
    onChange({
      wrongAnswers: [
        ...wrongAnswers,
        {
          id: createDocumentIdentifier(),
          value: '',
          feedback: createDocumentIdentifier()
        }
      ]
    })
  }
  removeAnswer = (index: number) => () => {
    const { state, onChange } = this.props
    onChange({
      wrongAnswers: R.remove(index, 1, state.wrongAnswers)
    })
  }
  wrongAnswerChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
                <Input
                  label="richtige Antwort:"
                  value={correctValue}
                  onChange={this.setCorrectValue}
                />
              </React.Fragment>
            )
          : null}
        {readOnly ? (
          <InputExerciseRenderer {...this.props} />
        ) : (
          <React.Fragment>
            <InputExerciseRenderer {...this.props} />
            {wrongAnswers.map((wrongAnswer: WrongAnswer, index: number) => {
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
                    <this.Label>
                      Feedback:
                      <Feedback>
                        <Document state={wrongAnswer.feedback} />
                      </Feedback>
                    </this.Label>
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

  private Label = styled.label({ clear: 'both' })
}

export interface InputExerciseEditorProps extends InputExerciseRendererProps {
  onChange: (newState: Partial<InputExercisePluginState>) => void
  readOnly: boolean
  focused: boolean
}
