import {
  Editable,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'
import * as R from 'ramda'
import { css } from 'emotion'

import { ScMcChoiceRenderer } from './choice-renderer.component'
import { ScMcRendererFeedback } from './renderer-feedback.component'
import { ScMcRendererTest } from './renderer-test.component'
import { ScMcRendererSolution } from './renderer-solution.component'
export interface Answer {
  isCorrect: boolean
  feedback: React.ReactNode
  id: EditableIdentifier
}
export interface Button {
  selected: boolean
  showFeedback: boolean
}
export interface ScMcRendererProps {
  state: {
    answers: Answer[]
    isSingleChoice: boolean
  }
}

enum Mode {
  test = 'test',
  feedback = 'feedback',
  solution = 'solution'
}
interface ScMcRendererState {
  mode: Mode
}

export class ScMcRenderer extends React.Component<
  ScMcRendererProps,
  ScMcRendererState
> {
  state = { mode: Mode.test }
  public render() {
    return (
      <React.Fragment>
        {this.renderRenderer()}
        {this.renderModeButton(Mode.test)}
        {this.renderModeButton(Mode.feedback)}
        {this.renderModeButton(Mode.solution)}
      </React.Fragment>
    )
  }
  private renderRenderer(): React.ReactNode {
    switch (this.state.mode) {
      case Mode.test:
        return <ScMcRendererTest {...this.props} />
      case Mode.feedback:
        return <ScMcRendererFeedback {...this.props} />
      case Mode.solution:
        return <ScMcRendererSolution {...this.props} />
    }
  }

  private renderModeButton(mode: Mode): React.ReactNode {
    return (
      <button
        className={css({ float: 'left', margin: '10px 0px' })}
        onClick={() => {
          this.toggleMode(mode)
        }}
        disabled={this.state.mode === mode}
      >
        {mode}
      </button>
    )
  }
  private toggleMode(mode: Mode) {
    this.setState({ mode })
  }
}
