import React, { Component } from 'react'
import './index.css'

export default class Feedback extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.isTrueAnswer ? (
          <div className="trueAnswerStyle"> {this.props.children} </div>
        ) : (
          <div className="falseAnswerStyle">{this.props.children} </div>
        )}
      </React.Fragment>
    )
  }
}
