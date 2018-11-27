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

export class ScMcRendererSolution extends React.Component<
  ScMcRendererProps,
  ScMcRendererState
> {
  constructor(props: ScMcRendererProps) {
    super(props)
    this.state = {
      buttons: props.state.answers.map(answer => {
        return {
          selected: answer.isCorrect,
          showFeedback: answer.isCorrect
        }
      }),
      globalFeedback: this.getGlobalFeedback({
        mistakes: 0,
        missingSolutions: 0
      }),
      showGlobalFeedback: true,
      solved: true
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
        hallo
        <div
          style={{ display: 'inline-block' }}
          ref={ref => {
            if (ref) {
              console.log('buttons', ref.clientWidth)
            }
          }}
        >
          {this.props.state.answers.map(this.showAnswer)}
        </div>
        {this.showGlobalFeedback()}
      </div>
    )
  }
  private showAnswer = (answer: Answer, index: number): React.ReactNode => {
    const button = this.state.buttons[index]
    return (
      <React.Fragment key={index}>
        <ScMcChoiceRenderer index={index} {...button} {...this.props}>
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
