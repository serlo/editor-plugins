import { Icon, faPlus, faTrashAlt, styled } from '@serlo/editor-ui'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'
import * as R from 'ramda'
import * as React from 'react'

import {
  ScMcExerciseChoiceRenderer,
  ScMcExerciseChoiceRendererProps
} from '@serlo/editor-plugin-sc-mc-exercise-renderer'

export class ScMcChoiceEditor extends React.Component<ScMcChoiceEditorProps> {
  render() {
    const { readOnly, state, index } = this.props
    const { isCorrect, feedback } = state.answers[index]

    return (
      <React.Fragment>
        {!readOnly ? (
          <this.EditorUiContainer>
            <this.RemoveButton
              onClick={this.removeAnswer}
              className="btn btn-default"
            >
              <Icon icon={faTrashAlt} />
            </this.RemoveButton>
            {isCorrect ? null : (
              <button onClick={this.addFeedback} className="btn btn-default">
                {feedback ? (
                  <span>
                    <Icon icon={faTrashAlt} /> Feedback
                  </span>
                ) : (
                  <span>
                    <Icon icon={faPlus} /> Feedback
                  </span>
                )}
              </button>
            )}
          </this.EditorUiContainer>
        ) : null}
        <this.ContentContainer>
          <ScMcExerciseChoiceRenderer {...this.props} />
        </this.ContentContainer>
      </React.Fragment>
    )
  }

  addFeedback = () => {
    const { state, onChange, index } = this.props
    const newAnswer = {
      ...state.answers[index],
      feedback: state.answers[index].feedback
        ? null
        : createDocumentIdentifier()
    }
    onChange({
      answers: R.update(index, newAnswer, state.answers)
    })
  }

  removeAnswer = () => {
    const { state, index, onChange } = this.props
    onChange({
      answers: R.remove(index, 1, state.answers)
    })
  }

  private EditorUiContainer = styled.div({
    float: 'right'
  })

  private ContentContainer = styled.div({
    clear: 'both'
  })

  private RemoveButton = styled.button({
    marginRight: '5px'
  })
}

export interface ScMcChoiceEditorProps extends ScMcExerciseChoiceRendererProps {
  onChange: (
    newState: Partial<ScMcExerciseChoiceRendererProps['state']>
  ) => void
  readOnly: boolean
  focused: boolean
}
