import {
  SolutionPluginState,
  SolutionRenderer
} from '@serlo/editor-plugin-solution-renderer'
import { Hint } from '@serlo/editor-ui'
import { Document } from '@splish-me/editor-core-document'
import * as React from 'react'

export class SolutionEditor extends React.Component<SolutionEditorProps> {
  public render(): React.ReactNode {
    const { onChange, state, readOnly } = this.props

    if (readOnly) {
      return <SolutionRenderer state={state} />
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
        <Document state={state.content} />
      </Hint>
    )
  }
}

export interface SolutionEditorProps {
  onChange: (state: Partial<SolutionPluginState>) => void
  state: SolutionPluginState
  readOnly?: boolean
}
