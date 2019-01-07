import {
  GeogebraPluginState,
  GeogebraRenderer
} from '@serlo-org/editor-plugin-geogebra-renderer'
import { renderIntoSidebar, Input } from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'

export class GeogebraEditor extends React.Component<GeogebraEditorProps> {
  public render(): React.ReactNode {
    const { focused, readOnly, state } = this.props

    return (
      <React.Fragment>
        {focused
          ? renderIntoSidebar(
              <Input
                label="Geogebra ID"
                placeholder="1221221"
                onChange={this.handleChange}
                value={state.src}
              />
            )
          : null}
        <GeogebraRenderer state={state} disableCursorEvents={!readOnly} />
      </React.Fragment>
    )
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    this.props.onChange({ src: target.value })
  }
}

export interface GeogebraEditorProps {
  onChange: (state: Partial<GeogebraPluginState>) => void
  state: GeogebraPluginState
  focused?: boolean
  readOnly?: boolean
}
