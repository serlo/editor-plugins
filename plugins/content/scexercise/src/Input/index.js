import * as React from 'react'
import Display from '../Display'
import '../index.css'

export default class Input extends React.Component {
  render() {
    const { handleValueChange, state } = this.props
    return (
      <React.Fragment>
        <Display {...this.props} />
        <button className="addButton" onClick={handleValueChange}>
          Add Answer
        </button>
      </React.Fragment>
    )
  }
}
