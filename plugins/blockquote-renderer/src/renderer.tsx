import { Document } from '@splish-me/editor'
import * as React from 'react'

import { BlockquotePluginState } from '.'

export class BlockquoteRenderer extends React.Component<
  BlockquoteRendererProps
> {
  public render() {
    const { state } = this.props
    return (
      <blockquote>
        <Document state={state.child} />
      </blockquote>
    )
  }
}

export interface BlockquoteRendererProps {
  state: BlockquotePluginState
}
