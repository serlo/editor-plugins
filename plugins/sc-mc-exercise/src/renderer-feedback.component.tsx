import {
  Editable,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'
import * as R from 'ramda'
import { css } from 'emotion'

import { ScMcChoiceRenderer } from './choice-renderer.component'
import { ScMcFeedback } from './feedback.component'
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

interface ScMcRendererState {
  buttons: Button[]
  globalFeedback: string
  showGlobalFeedback: boolean
  solved: boolean
}

export class ScMcRendererFeedback extends React.Component<
  ScMcRendererProps,
  ScMcRendererState
> {
  constructor(props: ScMcRendererProps) {
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
      <div
        ref={ref => {
          if (ref) {
            console.log('container', ref.clientWidth)
          }
        }}
      >
        <div>{this.props.state.answers.map(this.showAnswer)}</div>
        {this.showGlobalFeedback()}
        {this.showSubmitButton()}
      </div>
    )
  }
  private showAnswer = (answer: Answer, index: number): React.ReactNode => {
    const button = this.state.buttons[index]
    return (
      <React.Fragment key={index}>
        <ScMcChoiceRenderer
          index={index}
          onClick={this.selectButton(index)}
          {...button}
          {...this.props}
        >
          <Editable id={answer.id} />
        </ScMcChoiceRenderer>
        {this.showFeedback({ button, answer })}
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

    const nextButtonStates = buttons.map((button, i) => ({
      selected: button.selected && answers[i].isCorrect,
      showFeedback: button.selected
    }))

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
    if (mistakes === 0) {
      return 'Sehr gut!'
    } else if (mistakes === missingSolutions) {
      return 'Fast! Dir fehlt noch mindestens eine richtige Antwort'
    } else {
      return 'Das stimmt so leider nicht.'
    }
  }
}
