import { styled } from '@serlo/editor-ui'
import * as React from 'react'

import { Answer } from '.'

export class ScMcExerciseChoiceRenderer extends React.Component<
  ScMcExerciseChoiceRendererProps
> {
  render() {
    const {
      state,
      children,
      index,
      onClick,
      showFeedback,
      centered
    } = this.props
    const { isCorrect } = state.answers[index]
    const Container = centered ? this.Block : React.Fragment
    return (
      <this.ChoiceButton
        isCorrect={isCorrect}
        showFeedback={showFeedback}
        onClick={isCorrect && showFeedback ? undefined : onClick}
      >
        <Container>{children}</Container>
      </this.ChoiceButton>
    )
  }

  private getBackgroundColor = () => {
    const { showFeedback, selected, state, index } = this.props
    const { isCorrect } = state.answers[index]
    return showFeedback
      ? isCorrect
        ? '#95bc1a'
        : '#f7b07c'
      : selected
      ? '#d9edf7'
      : '#f8f8f8'
  }

  private ChoiceButton = styled.div<{
    isCorrect?: boolean
    showFeedback?: boolean
    onClick?: ScMcExerciseChoiceRendererProps['onClick']
  }>(({ isCorrect, showFeedback, onClick }) => {
    return {
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
          (isCorrect && showFeedback) || !onClick
            ? undefined
            : '3px solid #d9edf7'
      },
      cursor:
        (isCorrect && showFeedback) || !onClick
          ? 'default !important'
          : undefined
    }
  })

  private Block = styled.div({
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  })
}

export interface ScMcExerciseChoiceRendererProps {
  index: number
  state: { answers: Answer[] }
  onClick?: (event: any) => void
  showFeedback?: boolean
  selected?: boolean
  centered?: boolean
}
