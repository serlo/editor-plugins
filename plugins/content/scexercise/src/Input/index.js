import * as React from 'react'
import Display from '../Display'
import '../index.css'

export default class Input extends React.Component {
  render() {
    const { addButton, state } = this.props
    return (
      <React.Fragment>
        <Display {...this.props} />
        <button className="addButton" onClick={addButton}>
          Add Answer
        </button>
      </React.Fragment>
    )
  }
}
