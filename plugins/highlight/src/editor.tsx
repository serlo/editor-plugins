import {
  HighlightPluginState,
  HighlightRenderer
} from '@serlo-org/editor-plugin-highlight-renderer'
import { styled } from '@serlo-org/editor-ui'
import {
  Checkbox,
  Input,
  renderIntoSidebar
} from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'

export class HighlightEditor extends React.Component<HighlightEditorProps> {
  public render(): React.ReactNode {
    const { state, focused, readOnly } = this.props

    const { text, language, lineNumbers } = state

    return (
      <React.Fragment>
        {readOnly ? (
          <HighlightRenderer {...this.props} />
        ) : (
          <this.Textarea
            value={text}
            name="text"
            onChange={this.handleTextChange}
          >
            {text}
          </this.Textarea>
        )}
        {focused
          ? renderIntoSidebar(
              <React.Fragment>
                <Input
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

  private Textarea = styled.textarea({
    height: '250px',
    width: '100%',
    padding: '5px',
    fontFamily: 'Menlo, Monaco, "Courier New", monospace'
  })
}

export interface HighlightEditorProps {
  onChange: (state: HighlightPluginState) => void
  state: HighlightPluginState
  focused?: boolean
  readOnly?: boolean
}
