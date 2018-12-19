import { css } from 'emotion'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { TableRenderer, TableRendererProps } from './renderer.component'

const defaultSrc = '|edit|table|here...|\n|-|-|-|'

export class TableEditor extends React.Component<TableEditorProps> {
  public render() {
    const { focused, state } = this.props
    const { src } = state
    return (
      <div>
        <TableRenderer {...this.props} defaultSrc={defaultSrc} />
        {focused ? (
          <form
            className={css({
              marginTop: '10px'
            })}
          >
            <div>
              <Textarea
                className={css({
                  height: '50px',
                  width: '100%',
                  padding: '5px',
                  fontFamily: 'Menlo, Monaco, "Courier New", monospace'
                })}
                value={src}
                placeholder={defaultSrc}
                name="markdown"
                onChange={this.onChange}
              >
                {src}
              </Textarea>
            </div>
          </form>
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
}

export interface TableEditorProps extends TableRendererProps {
  onChange: (state: Partial<TableRendererProps['state']>) => void
  focused?: boolean
}
