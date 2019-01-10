import { styled } from '@serlo/editor-ui'
import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'

import { TablePluginState } from '.'

export class TableRenderer extends React.Component<TableRendererProps> {
  public render() {
    const { state, placeholder } = this.props
    const { src } = state

    return (
      <this.TableContainer>
        <ReactMarkdown source={src || placeholder} />
      </this.TableContainer>
    )
  }

  private TableContainer = styled.div({
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
  })
}

export interface TableRendererProps {
  state: TablePluginState
  placeholder?: string
}
