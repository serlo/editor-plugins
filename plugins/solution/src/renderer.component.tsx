import { Hint } from '@serlo-org/editor-ui/lib/hint.component'
import { Editable } from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'

import { SolutionPluginState } from './types'

export class SolutionRenderer extends React.Component<SolutionRendererProps> {
  public render(): React.ReactNode {
    const { state } = this.props

    return (
      <Hint kind="Lösung" title={state.title}>
        <Editable id={state.content} />
      </Hint>
    )
  }
}

export interface SolutionRendererProps {
  state: SolutionPluginState
}
