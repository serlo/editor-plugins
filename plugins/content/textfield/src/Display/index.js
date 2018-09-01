import { Editable } from '@splish-me/editor-core/src/editable.component'
import * as React from 'react'

import '../index.css'
import Feedback from '../../../helper-feedback/src/Feedback'
export default class Display extends React.Component {
  state = {
    positiveFeedback: false,
    negativeFeedbackIndex: null
  }
  input = React.createRef()
  translateDataType(type) {
    if (type === 'Ausdruck') return 'input-expression-equal-match-challenge'
    else if (type === 'Zahl') return 'input-number-exact-match-challenge'
    else return 'input-string-normalized-match-challenge'
  }
  checkAnswer = event => {
    event.preventDefault()
    const { state } = this.props
    const { correctValue, wrongAnswers } = state
    if (this.input.current.value === correctValue) {
      this.setState({ positiveFeedback: true })
    }
  }
  render() {
    const { state } = this.props
    const { correctValue, type, wrongAnswers } = state
    return (
      <div class="text-exercise">
        <form class="input-challenge-group" onSubmit={this.checkAnswer}>
          <div class="input-challenge-input-wrapper pull-right">
            <input
              class="input-challenge-input"
              data-type={this.translateDataType(type)}
              type="text"
              placeholder="Deine Lösung"
              ref={this.input}
            />
          </div>
          <div>
            <button> Submit </button>
          </div>
        </form>

        {this.state.positiveFeedback ? (
          <div>
            <Feedback isTrueAnswer> Sehr gut!</Feedback>
          </div>
        ) : null}
      </div>
    )
  }
}
