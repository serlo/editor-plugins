import { Editable } from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'

import { BlockquotePluginState } from './types'

export interface BlockquoteRendererProps {
  state: BlockquotePluginState
}

export class BlockquoteRenderer extends React.Component<BlockquoteRendererProps> {
  render() {
    const { state } = this.props
    return (
      <blockquote>
        <Editable id={state.child} />
      </blockquote>
    )
  }
}
