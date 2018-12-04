import * as React from 'react'
import { css } from 'emotion'

import { ScMcRendererFeedback } from './renderer-feedback.component'
import { ScMcRendererSolution } from './renderer-solution.component'
import { ScMcPluginState } from './types'

export interface ScMcRendererProps {
  state: ScMcPluginState
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
  state = { mode: Mode.feedback }
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
        return (
          <ScMcRendererFeedback
            key="test"
            {...this.props}
            nextButtonStateAfterSubmit={({ button, mistakes }) => {
              return {
                selected: mistakes !== 0 ? false : button.selected,
                showFeedback: mistakes !== 0 ? false : button.selected
              }
            }}
          />
        )
      case Mode.feedback:
        return (
          <ScMcRendererFeedback
            key="feedback"
            {...this.props}
            getFeedback={({ mistakes, missingSolutions }) => {
              if (mistakes > 0 && mistakes === missingSolutions) {
                return 'Fast! Dir fehlt noch mindestens eine richtige Antwort'
              }

              return undefined
            }}
            nextButtonStateAfterSubmit={({ button, answer }) => {
              return {
                selected: button.selected && answer.isCorrect,
                showFeedback: button.selected
              }
            }}
            showFeedback
          />
        )
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
