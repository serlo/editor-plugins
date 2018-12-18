import { Hint } from '@serlo-org/editor-ui/lib/hint.component'
import { Editable } from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'

import { SolutionPluginState } from './types'
import { SolutionRenderer } from './renderer.component'

export class SolutionEditor extends React.Component<SolutionEditorProps> {
  public render(): React.ReactNode {
    const { onChange, state, readOnly } = this.props

    if (readOnly) {
      return <SolutionRenderer {...this.props} />
    }

    return (
      <Hint
        kind="Lösung"
        shown
        title={
          <input
            onChange={e => onChange({ title: e.target.value })}
            value={state.title}
            placeholder="Optionaler Hinweistitel"
          />
        }
      >
        <Editable id={state.content} />
      </Hint>
    )
  }
}

export interface SolutionEditorProps {
  onChange: (state: Partial<SolutionPluginState>) => void
  state: SolutionPluginState
  readOnly?: boolean
}
