import {
  SpoilerPluginState,
  SpoilerRenderer
} from '@serlo/editor-plugin-spoiler-renderer'
import { styled } from '@serlo/editor-ui'
import * as React from 'react'

export class SpoilerEditor extends React.Component<SpoilerEditorProps> {
  public render() {
    const { state, readOnly, onChange } = this.props

    return (
      <SpoilerRenderer
        state={state}
        shown={readOnly}
        title={
          <this.Input
            onChange={e => {
              onChange({ title: e.target.value })
            }}
            value={state.title}
            placeholder="Your Title Here"
          />
        }
      />
    )
  }

  private Input = styled.input({
    '&:active': {
      color: '#ffffff'
    }
  })
}

export interface SpoilerEditorProps {
  onChange: (state: Partial<SpoilerPluginState>) => void
  state: SpoilerPluginState
  readOnly?: boolean
}
