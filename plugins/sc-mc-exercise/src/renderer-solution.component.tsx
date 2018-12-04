import { Editable } from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'

import { ScMcChoiceRenderer } from './choice-renderer.component'
import { Answer, ScMcPluginState } from './types'

export class ScMcRendererSolution extends React.Component<{
  state: ScMcPluginState
}> {
  public render() {
    return <div>{this.props.state.answers.map(this.showAnswer)}</div>
  }
  private showAnswer = (answer: Answer, index: number): React.ReactNode => {
    return (
      <ScMcChoiceRenderer
        key={index}
        index={index}
        selected={answer.isCorrect}
        showFeedback
        {...this.props}
      >
        <Editable id={answer.id} />
      </ScMcChoiceRenderer>
    )
  }
}
