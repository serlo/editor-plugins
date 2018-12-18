import { css } from 'emotion'
import * as React from 'react'

export interface FeedbackProps {
  boxFree?: boolean
  isTrueAnswer?: boolean
}
export class ScMcFeedback extends React.Component<FeedbackProps> {
  render() {
    return (
      <div
        className={
          this.props.boxFree
            ? css({
                color: this.props.isTrueAnswer ? '#95bc1a' : '#f7b07c',
                fontWeight: 'bold',
                textAlign: 'right'
              })
            : css({
                backgroundColor: '#fcf8e3',
                borderColor: '#faebcc',
                color: '#8a6d3b',
                padding: '15px'
              })
        }
      >
        {this.props.children}
      </div>
    )
  }
}
