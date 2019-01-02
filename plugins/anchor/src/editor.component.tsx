import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import SidebarTextfield from '@splish-me/editor-ui/lib/sidebar-elements/textfield'
import { AnchorRenderer } from './renderer.component'

export interface AnchorProps {
  isPreviewMode: boolean
  focused: boolean
  state: { id: string }
  onChange: (any) => void
}

export class Anchor extends React.Component<AnchorProps> {
  render() {
    const { isPreviewMode, focused, state } = this.props
    const { id } = state
    return (
      <React.Fragment>
        {isPreviewMode ? null : <FontAwesomeIcon icon={faLink} />}
        <AnchorRenderer {...this.props} />
        {focused
          ? renderIntoSidebar(
              <SidebarTextfield
                label="Identifier"
                value={id || ''}
                onChange={this.setValue}
              />
            )
          : null}
      </React.Fragment>
    )
  }
  setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    const value = target.value
    const { onChange } = this.props
    onChange({
      id: value
    })
  }
}
