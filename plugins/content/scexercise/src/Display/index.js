import { Editable } from '@splish-me/editor-core/src/editable.component'
import * as React from 'react'
import * as R from 'ramda'
import '../index.css'
import SCButton from '../Button/SCButton'
import { css } from 'emotion'
import Feedback from '../../../helper-feedback/src/Feedback'

export default class Display extends React.Component {
  constructor(props) {
    super(props)
    const { answers } = props.state
    this.state = {
      buttons: answers.map((_answer, _index) => {
        return false
      }),
      showFeedback: false,
      globalFeedback: ''
    }
  }
  selectButton = SelectedIndex => () => {
    const { state } = this.props
    const { isSingleChoice } = state
    if (isSingleChoice) {
      this.setState({
        showFeedback: false,
        buttons: this.state.buttons.map((_button, index) => {
          return index === SelectedIndex
        })
      })
    } else {
      this.setState({
        buttons: R.adjust(R.not, SelectedIndex, this.state.buttons),
        showFeedback: false,
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
      if (answers[i].isCorrect && !this.state.buttons[i]) {
        missingSolutions++
        mistakes++
      }
      if (!answers[i].isCorrect && this.state.buttons[i]) {
        mistakes++
      }
    }
    if (mistakes === 0)
      this.setState({
        showFeedback: true,
        globalFeedback: 'Sehr gut!'
      })
    else if (mistakes === missingSolutions)
      this.setState({
        showFeedback: true,
        globalFeedback: 'Fast! Dir fehlt noch mindestens eine richtige Antwort'
      })
    else
      this.setState({
        showFeedback: true,
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
            <React.Fragment>
              <SCButton
                key={index}
                index={index}
                onClick={this.selectButton(index)}
                selected={this.state.buttons[index]}
                showFeedback={this.state.showFeedback}
                {...this.props}
              >
                <Editable id={answer} />
              </SCButton>
              {this.state.buttons[index] && this.state.showFeedback ? (
                answer.feedback ? (
                  <Feedback>
                    <Editable id={answer.feedback} />
                  </Feedback>
                ) : answer.isCorrect ? null : (
                  <Feedback>
                    Leider falsch! versuche es doch noch einmal!
                  </Feedback>
                )
              ) : null}
            </React.Fragment>
          )
        })}
        {this.state.showFeedback ? (
          <div
            className={css({
              color:
                this.state.globalFeedback === 'Sehr gut!' ? '#95bc1a' : 'black',
              fontWeight: 'bold',
              float: 'left',
              margin: '10px 0px'
            })}
          >
            {this.state.globalFeedback}
          </div>
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
