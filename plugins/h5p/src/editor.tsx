import * as React from 'react'
import {
  H5pPluginState,
  H5pRenderer,
  H5pRendererProps
} from '@serlo/editor-plugin-h5p-renderer'
import { Input, renderIntoSidebar } from '@splish-me/editor-ui'

export class H5pEditor extends React.Component<H5pEditorProps> {
  public render() {
    const { focused, state } = this.props

    return (
      <React.Fragment>
        {focused
          ? renderIntoSidebar(
              <Input
                label="serlo.h5p.com ID"
                placeholder="1221221"
                onChange={this.handleChange}
                value={state.src}
              />
            )
          : null}
        <div style={{ pointerEvents: 'none' }}>
          <H5pRenderer key={state.src} state={state} />
        </div>
      </React.Fragment>
    )
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    this.props.onChange({ src: target.value })
  }
}

export interface H5pEditorProps extends H5pRendererProps {
  focused?: boolean
  readOnly?: boolean
  onChange: (state: Partial<H5pPluginState>) => void
}
