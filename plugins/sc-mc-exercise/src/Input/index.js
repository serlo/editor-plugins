import * as React from 'react'
import Display from '../Display'
import { css } from 'emotion'

export default class Input extends React.Component {
  render() {
    const { addButton, state } = this.props
    return (
      <React.Fragment>
        <Display {...this.props} />
        <button
          className={css({
            borderRadius: '50%',
            fontSize: '20px',
            outline: 'none',
            width: '35px',
            height: '35px',
            border: 'none',
            margin: 'auto'
          })}
          onClick={addButton}
        >
          Add Answer
        </button>
      </React.Fragment>
    )
  }
}
