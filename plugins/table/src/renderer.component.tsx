import { css } from 'emotion'
import * as React from 'react'
import ReactMarkdown from 'react-markdown'

export class TableRenderer extends React.Component<TableRendererProps> {
  public render() {
    const { state, defaultSrc } = this.props
    const { src } = state

    return (
      <div
        className={css({
          '& tr': {
            borderTop: '1px solid #c6cbd1'
          },
          '& th, & td': {
            padding: '6px 13px',
            border: '1px 1px solid #dfe2e5'
          },
          '& table tr:nth-child(2n)': {
            background: '#f6f8fa'
          }
        })}
      >
        <ReactMarkdown source={src || defaultSrc} />
      </div>
    )
  }
}

export interface TableRendererProps {
  state: TablePluginState
  defaultSrc?: string
}

interface TablePluginState {
  src: string
}
