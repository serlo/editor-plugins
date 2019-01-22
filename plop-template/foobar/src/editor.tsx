import * as React from 'react'
import {
  {{properCase name}}PluginState,
  {{properCase name}}Renderer,
  {{properCase name}}RendererProps
} from '@serlo/editor-plugin-{{dashCase name}}-renderer'
import { renderIntoSidebar, Text } from '@splish-me/editor-ui'

export class {{properCase name}}Editor extends React.Component<{{properCase name}}EditorProps> {
  public render() {
    const { focused, state } = this.props

    return (
      <React.Fragment>
        {focused ? renderIntoSidebar(<Text>Foo</Text>) : null}
        <{{properCase name}}Renderer state={state} />
      </React.Fragment>
    )
  }
}

export interface {{properCase name}}EditorProps extends {{properCase name}}RendererProps {
  focused?: boolean
  readOnly?: boolean
  onChange: (state: Partial<{{properCase name}}PluginState>) => void
}
