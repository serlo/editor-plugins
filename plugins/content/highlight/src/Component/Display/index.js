import React, { Component } from 'react'
import SyntaxHighlight from 'react-syntax-highlighter'
import { light } from 'react-syntax-highlighter/styles/prism'

class Display extends Component {
  render() {
    const { state } = this.props
    const { text, language, lineNumbers } = state

    return (
      <SyntaxHighlight
        language={language || 'text'}
        showLineNumbers={lineNumbers || false}
        style={light}
      >
        {text || 'Switch into edit mode then paste your sourcecode here...'}
      </SyntaxHighlight>
    )
  }
}

export default Display
