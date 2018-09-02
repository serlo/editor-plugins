import { Editable } from '@splish-me/editor-core/src/editable.component'
import * as React from 'react'
import { css } from 'emotion'
import S from 'string'
import A from 'algebra.js'

import '../index.css'
import Feedback from '../../../helper-feedback/src/Feedback'

export default class Display extends React.Component {
  state = {
    positiveFeedback: false,
    negativeFeedbackIndex: null,
    showFeedback: false
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
    const { correctValue, wrongAnswers, type } = state
    if (
      this.matchesInput(
        { type: type, value: correctValue },
        this.input.current.value
      )
    ) {
      this.setState({ positiveFeedback: true, showFeedback: true })
    } else {
      const index = wrongAnswers.findIndex(wrongAnswer => {
        return this.matchesInput(
          { type: type, value: wrongAnswer.value },
          this.input.current.value
        )
      })
      // const matchedAnswer = wrongAnswers[index] || {}
      this.setState({
        negativeFeedbackIndex: index,
        showFeedback: true,
        positiveFeedback: false
      })
    }
  }

  matchesInput = (field, input) => {
    try {
      const solution = this.normalize(field.type, field.value)
      const submission = this.normalize(field.type, input)

      switch (field.type) {
        case 'input-expression-equal-match-challenge':
          return solution.subtract(submission).toString() === '0'
        default:
          return solution === submission
      }
    } catch (err) {
      // e.g. if user input could not be parsed
      return false
    }
  }

  normalize = (type, string) => {
    const normalizeNumber = function(string) {
      return S(string).replaceAll(',', '.').s
    }
    const temp = S(string).collapseWhitespace()

    switch (type) {
      case 'input-number-exact-match-challenge':
        return S(normalizeNumber(temp))
          .replaceAll(' /', '/')
          .replaceAll('/ ', '/').s
      case 'input-expression-equal-match-challenge':
        return A.parse(normalizeNumber(temp))
      default:
        return temp.s.toUpperCase()
    }
  }

  render() {
    const { state } = this.props
    const { correctValue, type, wrongAnswers } = state
    return (
      <div class="text-exercise active">
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
          <div
            style={{
              clear: 'both'
            }}
          />
          {this.state.showFeedback ? (
            this.state.positiveFeedback ? (
              <div>
                <Feedback boxFree isTrueAnswer>
                  Sehr gut!
                </Feedback>
              </div>
            ) : this.state.negativeFeedbackIndex !== -1 ? (
              <Feedback boxFree>
                <Editable
                  id={wrongAnswers[this.state.negativeFeedbackIndex].feedback}
                />
              </Feedback>
            ) : (
              <Feedback boxFree> Leider falsch!</Feedback>
            )
          ) : null}
          <div className="input-challenge-solution">
            <button className="btn btn-primary btn-xs input-challenge-submit pull-right">
              <span className="input-challenge-submit-check">
                <i className="fa fa-check-circle" />
                Stimmt's?
              </span>
              <span className="input-challenge-submit-correct">
                <i className="fa fa-smile-o" />
                Stimmt!
              </span>
            </button>
            <div style={{ clear: 'both' }} />
          </div>
        </form>
      </div>
    )
  }
}
