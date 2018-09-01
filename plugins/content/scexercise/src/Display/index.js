import { Editable } from '@splish-me/editor-core/src/editable.component'
import * as React from 'react'
import * as R from 'ramda'
import '../index.css'
import SCButton from '../Button/SCButton'
import Feedback from '../../../helper-feedback/src/Feedback'

export default class Display extends React.Component {
  constructor(props) {
    super(props)
    const { answers } = props.state
    this.state = {
      buttons: answers.map((_answer, _index) => {
        return false
      }),
      showFeedback: false
    }
  }
  selectButton = index => () => {
    const { state } = this.props
    const { isSingleChoice } = state
    if (isSingleChoice) {
      this.setState({
        buttons: buttons.map((button, index) => {
          return false
        })
      })
    }
    this.setState({
      buttons: R.adjust(R.not, index, this.state.buttons),
      showFeedback: false
    })
  }

  submitAnswer = () => {
    this.setState({
      showFeedback: true
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
              {this.state.buttons[index] &&
              this.state.showFeedback &&
              answer.feedback ? (
                <Feedback>
                  <Editable id={answer.feedback} />
                </Feedback>
              ) : null}
            </React.Fragment>
          )
        })}
        <button onClick={this.submitAnswer}>Submit</button>
      </React.Fragment>
    )
  }
}
