import { Document } from '@splish-me/editor-core-document'
import * as React from 'react'

import { ScMcExerciseChoiceRenderer } from './choice-renderer'
import { Answer, ScMcExercisePluginState } from '.'

export class ScMcRendererSolution extends React.Component<{
  state: ScMcExercisePluginState
}> {
  public render() {
    return <div>{this.props.state.answers.map(this.showAnswer)}</div>
  }

  private showAnswer = (answer: Answer, index: number): React.ReactNode => {
    return (
      <ScMcExerciseChoiceRenderer
        key={index}
        index={index}
        selected={answer.isCorrect}
        showFeedback
        {...this.props}
      >
        <Document state={answer.id} />
      </ScMcExerciseChoiceRenderer>
    )
  }
}
