import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import Textfield from '@splish-me/editor-ui/lib/sidebar-elements/textfield'
import * as React from 'react'

import { InjectionRenderer, InjectionRendererProps } from './renderer.component'

export class InjectionEditor extends React.Component<InjectionEditorProps> {
  public render() {
    const { focused, ...props } = this.props

    return (
      <React.Fragment>
        <InjectionRenderer {...props} />
        {focused
          ? renderIntoSidebar(
              <Textfield
                label="Injection Element"
                placeholder="/12345"
                onChange={this.handleChange}
                value={props.state.src}
              />
            )
          : null}
      </React.Fragment>
    )
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ src: e.target.value })
  }
}

export interface InjectionEditorProps extends InjectionRendererProps {
  onChange: (state: Partial<InjectionRendererProps['state']>) => void
  focused?: boolean
}
