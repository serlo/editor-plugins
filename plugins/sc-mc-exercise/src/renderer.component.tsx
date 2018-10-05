import { Editable } from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'
import * as R from 'ramda'
import { css } from 'emotion'

import { ScMcChoice } from './choice.component'
import { ScMcFeedback } from './feedback.component'

export interface ScMcRendererProps {
  state: { answers: unknown[] }
}

interface ScMcRendererState {
  buttons: unknown[]
  globalFeedback: string
}

export class ScMcRenderer extends React.Component<
  ScMcRendererProps,
  ScMcRendererState
> {
  constructor(props: ScMcRendererProps) {
    super(props)
    const { answers } = props.state
    this.state = {
      buttons: answers.map((_answer, _index) => {
        return {
          selected: false,
          showFeedback: false
        }
      }),
      globalFeedback: ''
    }
  }
  selectButton = SelectedIndex => () => {
    const { state } = this.props
    const { isSingleChoice, answers } = state
    const { isCorrect } = answers[selectedIndex]

    if (isSingleChoice) {
      this.setState({
        buttons: this.state.buttons.map((button, index) => {
          return {
            selected: index === SelectedIndex,
            showFeedback: button.showFeedback
          }
        })
      })
    } else {
      if (isCorrect && this.state.buttons[selectedIndex].showFeedback) {
        return
      }
      this.setState({
        buttons: R.adjust(
          button => ({
            selected: button.showFeedback || !button.selected,
            showFeedback: button.showFeedback
          }),
          SelectedIndex,
          this.state.buttons
        ),
        globalFeedback: ''
      })
    }
  }

  submitAnswer = () => {
    let mistakes = 0
    let missingSolutions = 0
    const { state } = this.props
    const { answers } = state
    for (let i = 0; i < this.state.buttons.length; i++) {
      if (answers[i].isCorrect && !this.state.buttons[i].selected) {
        missingSolutions++
        mistakes++
      }
      if (!answers[i].isCorrect && this.state.buttons[i].selected) {
        mistakes++
      }
    }
    const nextButtonStates = this.state.buttons.map((button, i) => ({
      selected: button.selected && answers[i].isCorrect,
      showFeedback: button.selected
    }))
    if (mistakes === 0)
      this.setState({
        showFeedback: true,
        buttons: nextButtonStates,
        globalFeedback: 'Sehr gut!'
      })
    else if (mistakes === missingSolutions)
      this.setState({
        showFeedback: true,
        buttons: nextButtonStates,
        globalFeedback: 'Fast! Dir fehlt noch mindestens eine richtige Antwort'
      })
    else
      this.setState({
        showFeedback: true,
        buttons: nextButtonStates,
        globalFeedback: 'Das stimmt so leider nicht.'
      })
  }
  render() {
    const { state } = this.props
    const { answers } = state
    return (
      <React.Fragment>
        <hr />
        {answers.map((answer, index) => {
          return (
            <React.Fragment key={index}>
              <ScMcChoice
                index={index}
                onClick={this.selectButton(index)}
                selected={this.state.buttons[index].selected}
                showFeedback={this.state.buttons[index].showFeedback}
                {...this.props}
              >
                <Editable id={answer.id} />
              </ScMcChoice>
              {this.state.buttons[index].showFeedback ? (
                answer.feedback ? (
                  <ScMcFeedback>
                    <Editable id={answer.feedback} />
                  </ScMcFeedback>
                ) : answer.isCorrect ? null : (
                  <ScMcFeedback>
                    Leider falsch! versuche es doch noch einmal!
                  </ScMcFeedback>
                )
              ) : null}
            </React.Fragment>
          )
        })}
        {this.state.showFeedback ? (
          <ScMcFeedback
            boxFree
            isTrueAnswer={this.state.globalFeedback === 'Sehr gut!'}
          >
            {this.state.globalFeedback}
          </ScMcFeedback>
        ) : null}
        <button
          className={css({ float: 'right', margin: '10px 0px' })}
          onClick={this.submitAnswer}
        >
          Submit
        </button>
      </React.Fragment>
    )
  }
}
