import {
  ScMcExercisePluginState,
  ScMcExerciseRenderer
} from '@serlo/editor-plugin-sc-mc-exercise-renderer'
import { Feedback, Icon, faPlus, styled } from '@serlo/editor-ui'
import { createDocumentIdentifier, Document } from '@splish-me/editor'
import { Dropdown, renderIntoSidebar } from '@splish-me/editor-ui'
import * as R from 'ramda'
import * as React from 'react'

import { ScMcChoiceEditor } from './choice-editor'

export class ScMcExerciseEditor extends React.Component<
  ScMcExerciseEditorProps
> {
  public render() {
    const { readOnly, state, focused } = this.props
    const { answers, isSingleChoice } = state

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
          <ScMcExerciseRenderer state={state} />
        ) : (
          <React.Fragment>
            <hr />
            {answers.map((answer, index) => {
              return (
                <this.AnswerContainer key={index}>
                  <this.AnswerLabel>
                    <span>richtige Antwort</span>

                    <input
                      checked={answer.isCorrect}
                      type={isSingleChoice ? 'radio' : 'checkbox'}
                      onChange={
                        isSingleChoice
                          ? this.handleRadioButtonChange(index)
                          : this.handleCheckboxChange(index)
                      }
                    />
                  </this.AnswerLabel>

                  <ScMcChoiceEditor key={index} index={index} {...this.props}>
                    <Document state={answer.id} />
                  </ScMcChoiceEditor>
                  {answer.feedback ? (
                    <Feedback>
                      <Document state={answer.feedback} />
                    </Feedback>
                  ) : null}
                </this.AnswerContainer>
              )
            })}

            <this.AddButtonContainer>
              <this.AddButton onClick={this.addButton}>
                <Icon icon={faPlus} />
              </this.AddButton>
            </this.AddButtonContainer>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }

  private handleCheckboxChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  private handleRadioButtonChange = (rightanswerIndex: number) => () => {
    const { state, onChange } = this.props
    onChange({
      answers: state.answers.map((answer, index) => {
        return { ...answer, isCorrect: index === rightanswerIndex }
      })
    })
  }

  private handleSCMCChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { onChange, state } = this.props
    onChange({
      isSingleChoice: event.target.value === 'Single Choice',
      answers: state.answers.map(answer => {
        return { ...answer, isCorrect: false }
      })
    })
  }

  private addButton = () => {
    const { onChange, state } = this.props

    onChange({
      answers: [
        ...state.answers,
        {
          id: createDocumentIdentifier(),
          isCorrect: false,
          feedback: null
        }
      ]
    })
  }

  private AnswerContainer = styled.div({
    marginBottom: '10px'
  })

  private AnswerLabel = styled.label({
    float: 'left',
    margin: '10px 0',

    span: {
      marginRight: '10px',
      paddingBottom: '5px'
    }
  })

  private AddButtonContainer = styled.div({
    textAlign: 'center'
  })

  private AddButton = styled.button({
    borderRadius: '50%',
    outline: 'none',
    width: '35px',
    height: '35px',
    border: 'none',
    margin: 'auto'
  })
}

export interface ScMcExerciseEditorProps {
  readOnly: boolean
  focused: boolean
  state: ScMcExercisePluginState
  onChange: (state: Partial<ScMcExercisePluginState>) => void
}
