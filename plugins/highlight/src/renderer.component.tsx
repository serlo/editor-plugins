import * as React from 'react'
import SyntaxHighlight from 'react-syntax-highlighter'

import { HighlightPluginState } from './types'

export class HighlightRenderer extends React.Component<HighlightRendererProps> {
  render() {
    const { state } = this.props
    const { text, language, lineNumbers } = state

    return (
      <SyntaxHighlight
        language={language || 'text'}
        showLineNumbers={lineNumbers || false}
      >
        {text || 'Switch into edit mode then paste your sourcecode here...'}
      </SyntaxHighlight>
    )
  }
}

export interface HighlightRendererProps {
  state: HighlightPluginState
}
