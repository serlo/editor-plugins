import {
  HintPluginState,
  HintRenderer
} from '@serlo/editor-plugin-hint-renderer'
import { Hint } from '@serlo/editor-ui'
import { Document } from '@splish-me/editor-core-document'
import * as React from 'react'

export class HintEditor extends React.Component<HintEditorProps> {
  public render(): React.ReactNode {
    const { onChange, state, readOnly } = this.props

    if (readOnly) {
      return <HintRenderer state={state} />
    }

    return (
      <Hint
        kind="Tipp"
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

export interface HintEditorProps {
  onChange: (state: Partial<HintPluginState>) => void
  state: HintPluginState
  readOnly?: boolean
}
