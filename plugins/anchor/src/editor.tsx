import { Icon, faLink } from '@serlo-org/editor-ui'
import {
  AnchorPluginState,
  AnchorRenderer,
  AnchorRendererProps
} from '@serlo-org/editor-plugin-anchor-renderer'
import { Input, renderIntoSidebar } from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'

export class AnchorEditor extends React.Component<AnchorEditorProps> {
  public render() {
    const { isPreviewMode, focused, state } = this.props
    const { id } = state
    return (
      <React.Fragment>
        {isPreviewMode ? null : <Icon icon={faLink} />}
        <AnchorRenderer state={state} />
        {focused
          ? renderIntoSidebar(
              <Input
                label="Identifier"
                value={id || ''}
                onChange={this.setValue}
              />
            )
          : null}
      </React.Fragment>
    )
  }

  private setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({
      id: event.target.value
    })
  }
}

export interface AnchorEditorProps extends AnchorRendererProps {
  isPreviewMode: boolean
  focused: boolean
  onChange: (state: AnchorPluginState) => void
}
