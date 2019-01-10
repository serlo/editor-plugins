import { Hint } from '@serlo/editor-ui'
import { Document } from '@splish-me/editor-core-document'
import * as React from 'react'

import { HintPluginState } from '.'

export class HintRenderer extends React.Component<HintRendererProps> {
  public render(): React.ReactNode {
    const { state } = this.props

    return (
      <Hint kind="Tipp" title={state.title}>
        <Document state={state.content} />
      </Hint>
    )
  }
}

export interface HintRendererProps {
  state: HintPluginState
}
