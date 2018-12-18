import { Editable } from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'
import * as R from 'ramda'
import { css } from 'emotion'

import { ScMcChoiceRenderer } from './choice-renderer.component'
import { ScMcFeedback } from './feedback.component'
import { Answer, ScMcPluginState } from './types'

export interface Button {
  selected: boolean
  showFeedback: boolean
}
export interface ScMcRendererInteractiveProps {
  state: ScMcPluginState
  getFeedback?: (
    params: {
      mistakes: number
      missingSolutions: number
    }
  ) => string | undefined
  nextButtonStateAfterSubmit: (
    params: {
      button: Button
      answer: Answer
      mistakes: number
      missingSolutions: number
    }
  ) => Button
  showFeedback?: boolean
}

interface ScMcRendererState {
  buttons: Button[]
  globalFeedback: string
  showGlobalFeedback: boolean
  solved: boolean
}

export class ScMcRendererInteractive extends React.Component<
  ScMcRendererInteractiveProps,
  ScMcRendererState
> {
  static defaultProps = {
    getFeedback: () => undefined
  }

  constructor(props: ScMcRendererInteractiveProps) {
    super(props)
    this.state = {
      buttons: props.state.answers.map(() => {
        return {
          selected: false,
          showFeedback: false
        }
      }),
      globalFeedback: '',
      showGlobalFeedback: false,
      solved: false
    }
  }

  public render() {
    return (
      <React.Fragment>
        <div>{this.props.state.answers.map(this.showAnswer)}</div>
        {this.showGlobalFeedback()}
        {this.showSubmitButton()}
      </React.Fragment>
    )
  }
  private showAnswer = (answer: Answer, index: number): React.ReactNode => {
    const button = this.state.buttons[index]
    return (
      <React.Fragment key={index}>
        <ScMcChoiceRenderer
          index={index}
          onClick={this.selectButton(index)}
          {...this.props} // showFeedback: true
          {...button} // showFeedback: false
        >
          <Editable id={answer.id} />
        </ScMcChoiceRenderer>
        {this.props.showFeedback ? this.showFeedback({ button, answer }) : null}
      </React.Fragment>
    )
  }

  private showFeedback({
    answer,
    button
  }: {
    answer: Answer
    button: Button
  }): React.ReactNode {
    if (!button.showFeedback) {
      return null
    }
    if (answer.feedback) {
      return (
        <ScMcFeedback>
          <Editable id={answer.feedback} />
        </ScMcFeedback>
      )
    }
    if (answer.isCorrect) {
      return null
    }
    return (
      <ScMcFeedback>Leider falsch! versuche es doch noch einmal!</ScMcFeedback>
    )
  }
  private showGlobalFeedback(): React.ReactNode {
    const { showGlobalFeedback, globalFeedback, solved } = this.state
    if (showGlobalFeedback) {
      return (
        <ScMcFeedback boxFree isTrueAnswer={solved}>
          {globalFeedback}
        </ScMcFeedback>
      )
    }
    return null
  }

  private showSubmitButton(): React.ReactNode {
    return (
      <button
        className={css({ float: 'right', margin: '10px 0px' })}
        onClick={this.submitAnswer}
      >
        Submit
      </button>
    )
  }

  submitAnswer = () => {
    const { buttons } = this.state
    const { answers } = this.props.state
    const temp = R.zip(buttons, answers)
    const mistakes = R.reduce(
      (acc, [button, answer]) => {
        return acc + (answer.isCorrect !== button.selected ? 1 : 0)
      },
      0,
      temp
    )
    const missingSolutions = R.reduce(
      (acc, [button, answer]) => {
        return acc + (answer.isCorrect && !button.selected ? 1 : 0)
      },
      0,
      temp
    )

    const nextButtonStates = buttons.map((button, i) => {
      return this.props.nextButtonStateAfterSubmit({
        button,
        answer: answers[i],
        mistakes,
        missingSolutions
      })
    })

    this.setState({
      showGlobalFeedback: true,
      buttons: nextButtonStates,
      solved: mistakes === 0,
      globalFeedback: this.getGlobalFeedback({ mistakes, missingSolutions })
    })
  }

  selectButton = (selectedIndex: number) => () => {
    const { isSingleChoice } = this.props.state
    const { buttons } = this.state

    if (isSingleChoice) {
      this.setState({
        buttons: buttons.map((button, index) => {
          return R.assoc('selected', index === selectedIndex, button)
        })
      })
    } else {
      this.setState({
        buttons: R.adjust(
          button => R.assoc('selected', !button.selected, button),
          selectedIndex,
          buttons
        ),
        globalFeedback: ''
      })
    }
  }
  private getGlobalFeedback({
    mistakes,
    missingSolutions
  }: {
    mistakes: number
    missingSolutions: number
  }): string {
    // FIXME:
    const feedback = this.props.getFeedback!({
      mistakes,
      missingSolutions
    })

    if (feedback) {
      return feedback
    }

    if (mistakes === 0) {
      return 'Sehr gut!'
    } else {
      return 'Das stimmt so leider nicht.'
    }
  }
}
