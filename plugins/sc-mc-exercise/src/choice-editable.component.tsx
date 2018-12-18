import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import * as R from 'ramda'
import * as React from 'react'
import { css, cx } from 'emotion'
import {
  ChoiceRendererProps,
  ScMcChoiceRenderer
} from './choice-renderer.component'

export interface ChoiceProps extends ChoiceRendererProps {
  onChange: (newState: Partial<ChoiceRendererProps['state']>) => void
  readOnly: boolean
  focused: boolean
}

export class ScMcChoiceEditable extends React.Component<ChoiceProps> {
  render() {
    const { readOnly, state, index } = this.props
    const { isCorrect, feedback } = state.answers[index]

    return (
      <React.Fragment>
        {!readOnly ? (
          <div
            className={css({
              float: 'right'
            })}
          >
            <button
              onClick={this.removeAnswer}
              className={cx('btn btn-default', css({ marginRight: '5px' }))}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {isCorrect ? null : (
              <button onClick={this.addFeedback} className="btn btn-default">
                {feedback ? (
                  <span>
                    <FontAwesomeIcon icon={faTrashAlt} /> Feedback
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faPlus} /> Feedback
                  </span>
                )}
              </button>
            )}
          </div>
        ) : null}
        <div className={css({ clear: 'both' })}>
          <ScMcChoiceRenderer {...this.props} />
        </div>
      </React.Fragment>
    )
  }

  addFeedback = () => {
    const { state, onChange, index } = this.props
    const newAnswer = {
      ...state.answers[index],
      feedback: state.answers[index].feedback
        ? null
        : createEditableIdentifier()
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
}
