import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import Textfield from '@splish-me/editor-ui/lib/sidebar-elements/textfield'
import Checkbox from '@splish-me/editor-ui/lib/sidebar-elements/checkbox'
import * as React from 'react'

import { HighlightPluginState } from './types'
import { HighlightRenderer } from './renderer.component'

export class HighlightEditor extends React.Component<HighlightEditorProps> {
  public render(): React.ReactNode {
    // TODO: use CSS-in-JS instead
    const style = {
      textarea: {
        height: '250px',
        width: '100%',
        padding: '5px',
        fontFamily: 'Menlo, Monaco, "Courier New", monospace'
      },
      spaceRight: {
        marginRight: '5px'
      }
    }

    const { state, focused, readOnly } = this.props

    const { text, language, lineNumbers } = state

    return (
      <React.Fragment>
        {readOnly ? (
          <HighlightRenderer {...this.props} />
        ) : (
          <textarea
            value={text}
            name="text"
            onChange={this.handleTextChange}
            style={style.textarea}
          >
            {text}
          </textarea>
        )}
        {focused
          ? renderIntoSidebar(
              <React.Fragment>
                <Textfield
                  value={language || 'text'}
                  label="Language"
                  onChange={this.handleLanguageChange}
                  placeholder="enter"
                />
                <a
                  href="https://github.com/conorhastings/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_HLJS.MD"
                  target="_blank"
                >
                  Available languages
                </a>
                <Checkbox
                  label="Show line numbers"
                  onChange={this.handleLineNumbersChange}
                  value={lineNumbers}
                />
              </React.Fragment>
            )
          : null}
      </React.Fragment>
    )
  }

  private handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    this.props.onChange({
      text: event.target.value
    })
  }

  private handleLanguageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.onChange({
      language: event.target.value
    })
  }

  private handleLineNumbersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.onChange({
      lineNumbers: event.target.checked
    })
  }
}

export interface HighlightEditorProps {
  onChange: (state: HighlightPluginState) => void
  state: HighlightPluginState
  focused?: boolean
  readOnly?: boolean
}
