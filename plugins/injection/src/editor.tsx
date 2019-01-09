import {
  InjectionPluginState,
  InjectionRenderer
} from '@serlo-org/editor-plugin-injection-renderer'
import { Input, renderIntoSidebar } from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'

export class InjectionEditor extends React.Component<InjectionEditorProps> {
  public render() {
    const { focused, readOnly, state } = this.props

    return (
      <React.Fragment>
        <InjectionRenderer disableCursorEvents={!readOnly} state={state} />
        {focused
          ? renderIntoSidebar(
              <Input
                label="Injection Element"
                placeholder="/12345"
                onChange={this.handleChange}
                value={state.src}
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

export interface InjectionEditorProps {
  onChange: (state: Partial<InjectionPluginState>) => void
  state: InjectionPluginState
  focused?: boolean
  readOnly?: boolean
}
