import * as React from 'react'
import { css, cx } from 'emotion'
import { Answer } from './renderer.component'

export interface ChoiceRendererProps {
  index: number
  state: { answers: Answer[] }
  onClick?: (event: any) => void
  showFeedback?: boolean
  selected?: boolean
}
export class ScMcChoiceRenderer extends React.Component<ChoiceRendererProps> {
  render() {
    const { state, children, index, onClick, showFeedback } = this.props
    const { isCorrect } = state.answers[index]

    return (
      <React.Fragment>
        <div
          className={cx(
            'btn',
            css({
              borderBottom: '3px solid transparent',
              minWidth: '20px',
              backgroundColor: this.getBackgroundColor(),
              margin: '5px 0 0',
              paddingLeft: '5px',
              paddingTop: '10px',
              boxShadow: 'none',
              transition: 'background-color 0.5s ease',
              '&:hover': {
                borderBottom:
                  isCorrect && showFeedback ? undefined : '3px solid #d9edf7'
              },
              cursor:
                isCorrect && showFeedback ? 'default !important' : undefined
            })
          )}
          onClick={isCorrect && showFeedback ? undefined : onClick}
        >
          {children}
        </div>
      </React.Fragment>
    )
  }

  getBackgroundColor = () => {
    const { showFeedback, selected, state, index } = this.props
    const { isCorrect } = state.answers[index]
    return showFeedback
      ? isCorrect
        ? '#95bc1a'
        : 'red'
      : selected
        ? '#d9edf7'
        : '#f8f8f8'
  }
}
