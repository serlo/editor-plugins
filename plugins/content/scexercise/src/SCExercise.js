import * as React from 'react'
//import * as uuid from 'uuid'
import Display from './Display'
import Input from './Input'
import SCButton from './Button/SCButton'

export default class SCEXercise extends React.Component {
  handleCheckboxChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.props.onChange({
      [name]: value
    })
  }
  handleValueChange(event) {
    return <SCButton />
  }

  render() {
    const { readOnly, state } = this.props
    const { question, answers } = state

    return (
      <React.Fragment>
        {readOnly ? (
          <Display {...this.props} />
        ) : (
          <Input
            {...this.props}
            handleValueChange={this.handleValueChange.bind(this)}
          />
        )}
      </React.Fragment>
    )
  }
}
