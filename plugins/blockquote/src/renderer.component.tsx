import { Editable } from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'

import { BlockquotePluginState } from './types'

export class BlockquoteRenderer extends React.Component<BlockquoteRendererProps> {
  public render() {
    const { state } = this.props
    return (
      <blockquote>
        <Editable id={state.child} />
      </blockquote>
    )
  }
}

export interface BlockquoteRendererProps {
  state: BlockquotePluginState
}
