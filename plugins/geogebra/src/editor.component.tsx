import * as React from 'react'
import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import Textfield from '@splish-me/editor-ui/lib/sidebar-elements/textfield'

import { GeoGebraRenderer } from './renderer.component'
import { GeoGebraPluginState } from './types'

export class GeoGebraEditor extends React.Component<GeoGebraEditorProps> {
  public render(): React.ReactNode {
    const { focused, ...props } = this.props

    return (
      <React.Fragment>
        <GeoGebraRenderer {...props} />
        {focused
          ? renderIntoSidebar(
              <Textfield
                label="Geogebra ID"
                placeholder="1221221"
                onChange={this.handleChange}
                value={props.state.src}
              />
            )
          : null}
      </React.Fragment>
    )
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    this.props.onChange({ src: target.value })
  }
}

export interface GeoGebraEditorProps {
  onChange: (state: GeoGebraPluginState) => void
  state: GeoGebraPluginState
  focused?: boolean
  readOnly?: boolean
}
