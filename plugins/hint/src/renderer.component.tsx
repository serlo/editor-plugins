import { Hint } from '@serlo-org/editor-ui/lib/hint.component'
import { Editable } from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'

import { HintPluginState } from './types'

export class HintRenderer extends React.Component<HintRendererProps> {
  public render(): React.ReactNode {
    const { state } = this.props

    return (
      <Hint kind="Tipp" title={state.title}>
        <Editable id={state.content} />
      </Hint>
    )
  }
}

export interface HintRendererProps {
  state: HintPluginState
}
