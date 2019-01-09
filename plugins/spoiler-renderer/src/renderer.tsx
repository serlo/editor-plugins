import { Document } from '@splish-me/editor-core-document'
import { styled } from '@serlo-org/editor-ui'
import * as React from 'react'

import { SpoilerPluginState } from '.'

export class SpoilerRenderer extends React.Component<
  SpoilerRendererProps,
  SpoilerRendererState
> {
  public state: SpoilerRendererState = { hidden: true }

  public render() {
    const { state, title, shown } = this.props
    const { hidden } = this.state

    const icon = hidden ? 'fa-caret-square-o-down' : 'fa-caret-square-o-up'

    return (
      <this.SpoilerContainer>
        <this.Toggle onClick={this.onToggle}>
          <span className={`fa ${icon}`} />
          {title ? title : state.title}
        </this.Toggle>

        <this.ContentContainer hidden={hidden && !shown}>
          <Document state={state.content} />
        </this.ContentContainer>
      </this.SpoilerContainer>
    )
  }

  private onToggle = () => {
    this.setState(({ hidden }) => {
      return { hidden: !hidden }
    })
  }

  private SpoilerContainer = styled.div({
    backgroundColor: '#f5f5f5',
    padding: '10px 15px 10px 40px',
    position: 'relative',
    borderColor: '#dddddd',
    textAlign: 'left',
    cursor: 'pointer',
    minHeight: '41px',

    '& .fa': {
      position: 'absolute',
      bottom: '13px',
      left: '15px'
    }
  })

  private Toggle = styled.div({
    backgroundColor: '#f5f5f5',
    padding: '10px 15px 10px 40px',
    position: 'relative',
    borderColor: '#dddddd',
    textAlign: 'left',
    cursor: 'pointer',
    minHeight: '41px',

    '& .fa': {
      position: 'absolute',
      bottom: '13px',
      left: '15px'
    }
  })

  private ContentContainer = styled.div<{ hidden?: boolean }>(({ hidden }) => {
    return {
      padding: '15px',
      display: hidden ? 'none' : 'block'
    }
  })
}

export interface SpoilerRendererProps {
  state: SpoilerPluginState
  title?: React.ReactNode
  shown?: boolean
}

export interface SpoilerRendererState {
  hidden: boolean
}
