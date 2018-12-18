import { Hint } from '@serlo-org/editor-ui/lib/hint.component'
import { Editable } from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'

import { HintPluginState } from './types'
import { HintRenderer } from './renderer.component'

export class HintEditor extends React.Component<HintEditorProps> {
  public render(): React.ReactNode {
    const { onChange, state, readOnly } = this.props

    if (readOnly) {
      return <HintRenderer {...this.props} />
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
        <Editable id={state.content} />
      </Hint>
    )
  }
}

export interface HintEditorProps {
  onChange: (state: Partial<HintPluginState>) => void
  state: HintPluginState
  readOnly?: boolean
}
