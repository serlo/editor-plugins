import React, { Component } from 'react'

import Display from './Display'
import Input from './Input'

class Highlight extends Component {
  handleValueChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.props.onChange({
      [name]: value
    })
  }

  render() {
    const { readOnly, state, focused } = this.props
    const { text, language, lineNumbers } = state

    return (
      <div>
        {readOnly ? (
          <Display {...this.props} />
        ) : (
          <Input
            handleValueChange={this.handleValueChange.bind(this)}
            text={text}
            language={language}
            lineNumbers={lineNumbers}
            focused={focused}
          />
        )}
      </div>
    )
  }
}

export default Highlight
