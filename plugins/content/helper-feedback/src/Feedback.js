import React, { Component } from 'react'
import './index.css'

export default class Feedback extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.boxFree ? (
          this.props.isTrueAnswer ? (
            <div className="trueAnswerStyle-wo-box">{this.props.children}</div>
          ) : (
            <div className="wrongAnswerStyle-wo-box">{this.props.children}</div>
          )
        ) : (
          <div className="wrongAnswerStyle">{this.props.children} </div>
        )}
      </React.Fragment>
    )
  }
}
