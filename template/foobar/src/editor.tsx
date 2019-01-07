import * as React from 'react'
import {
  FoobarPluginState,
  FoobarRenderer,
  FoobarRendererProps
} from '@serlo-org/editor-plugin-foobar-renderer'
import { renderIntoSidebar, Text } from '@splish-me/editor-ui-plugin-sidebar'

export class FoobarEditor extends React.Component<FoobarEditorProps> {
  public render() {
    const { focused, state } = this.props

    return (
      <React.Fragment>
        {focused ? renderIntoSidebar(<Text>Foo</Text>) : null}
        <FoobarRenderer state={state} />
      </React.Fragment>
    )
  }
}

export interface FoobarEditorProps extends FoobarRendererProps {
  focused?: boolean
  readOnly?: boolean
  onChange: (state: Partial<FoobarPluginState>) => void
}
