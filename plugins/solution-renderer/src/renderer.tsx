import { Hint } from '@serlo-org/editor-ui'
import { Document } from '@splish-me/editor-core-document'
import * as React from 'react'

import { SolutionPluginState } from '.'

export class SolutionRenderer extends React.Component<SolutionRendererProps> {
  public render(): React.ReactNode {
    const { state } = this.props

    return (
      <Hint kind="Lösung" title={state.title}>
        <Document state={state.content} />
      </Hint>
    )
  }
}

export interface SolutionRendererProps {
  state: SolutionPluginState
}
