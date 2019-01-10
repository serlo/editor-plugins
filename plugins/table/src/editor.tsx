import {
  TablePluginState,
  TableRenderer,
  TableRendererProps
} from '@serlo/editor-plugin-table-renderer'
import { styled } from '@serlo/editor-ui'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

const placeholder = '|edit|table|here...|\n|-|-|-|'

export class TableEditor extends React.Component<TableEditorProps> {
  public render() {
    const { focused, state } = this.props
    const { src } = state
    return (
      <div>
        <TableRenderer {...this.props} placeholder={placeholder} />
        {focused ? (
          <this.Form>
            <div>
              <this.MarkdownTextarea
                value={src}
                placeholder={placeholder}
                name="markdown"
                onChange={this.onChange}
              >
                {src}
              </this.MarkdownTextarea>
            </div>
          </this.Form>
        ) : null}
      </div>
    )
  }

  private onChange = event => {
    const value = event.target.value
    this.props.onChange({
      src: value
    })
  }

  private Form = styled.form({
    marginTop: '10px'
  })

  private MarkdownTextarea = styled(Textarea)({
    height: '50px',
    width: '100%',
    padding: '5px',
    fontFamily: 'Menlo, Monaco, "Courier New", monospace'
  })
}

export interface TableEditorProps extends TableRendererProps {
  onChange: (state: Partial<TablePluginState>) => void
  focused?: boolean
}
