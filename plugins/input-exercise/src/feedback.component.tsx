import { css } from 'emotion'
import * as React from 'react'

export interface FeedbackProps {
  boxFree?: boolean
  isTrueAnswer?: boolean
}
export class Feedback extends React.Component<FeedbackProps> {
  render() {
    return (
      <React.Fragment>
        {this.props.boxFree ? (
          <div
            className={css({
              color: this.props.isTrueAnswer ? '#95bc1a' : '#f7b07c',
              fontWeight: 'bold',
              textAlign: 'right'
            })}
          >
            {this.props.children}
          </div>
        ) : (
          <div
            className={css({
              backgroundColor: '#fcf8e3',
              borderColor: '#faebcc',
              color: '#8a6d3b',
              padding: '15px'
            })}
          >
            {this.props.children}
          </div>
        )}
      </React.Fragment>
    )
  }
}
