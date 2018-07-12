import React, { Component } from 'react'
import Display from './Display/index.js'
import Input from './Input/index.js'

export default class SCButton extends Component {
  handleValueChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.props.onChange({
      [name]: value
    })
  }
  render() {
    const { readOnly, state } = this.props
    const { isTrue } = state
    return (
      <React.Fragment>
        {readOnly ? (
          <Display {...this.props} />
        ) : (
          <Input {...this.props} handleValueChange={this.handleValueChange} />
        )}
      </React.Fragment>
    )
  }
}
