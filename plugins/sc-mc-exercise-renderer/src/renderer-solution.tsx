import { Document } from '@splish-me/editor'
import * as React from 'react'

import { ScMcExerciseChoiceRenderer } from './choice-renderer'
import { Answer, ScMcExercisePluginState } from '.'
import { ScMcAnswersRenderer } from './answers-renderer'

export class ScMcRendererSolution extends React.Component<{
  state: ScMcExercisePluginState
}> {
  public render() {
    return (
      <ScMcAnswersRenderer
        state={this.props.state}
        showAnswer={this.showAnswer}
      />
    )
  }

  private showAnswer = (
    answer: Answer,
    index: number,
    centered: boolean
  ): React.ReactNode => {
    return (
      <ScMcExerciseChoiceRenderer
        key={index}
        index={index}
        selected={answer.isCorrect}
        showFeedback
        {...this.props}
        centered={centered}
      >
        <Document state={answer.id} />
      </ScMcExerciseChoiceRenderer>
    )
  }
}
