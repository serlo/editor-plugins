import {
  SpoilerPluginState,
  SpoilerRenderer
} from '@serlo/editor-plugin-spoiler-renderer'
import { styled } from '@serlo/editor-ui'
import * as React from 'react'

export class SpoilerEditor extends React.Component<SpoilerEditorProps> {
  public render() {
    const { state, readOnly, onChange, isPreviewMode } = this.props

    const props = {
      ...(isPreviewMode ? {} : { shown: readOnly }),
      ...(readOnly
        ? {}
        : {
            title: (
              <this.Input
                onChange={e => {
                  onChange({ title: e.target.value })
                }}
                value={state.title}
                placeholder="Your Title Here"
              />
            )
          })
    }

    return <SpoilerRenderer state={state} {...props} />
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
  isPreviewMode?: boolean
}
