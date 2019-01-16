import * as React from 'react'

import { {{properCase name}}PluginState } from '.'

export class {{properCase name}}Renderer extends React.Component<{{properCase name}}RendererProps> {
  public render() {
    const { state } = this.props
    return <div>{state.foo}</div>
  }
}

export interface {{properCase name}}RendererProps {
  state: {{properCase name}}PluginState
}
