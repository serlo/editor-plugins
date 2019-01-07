import * as React from 'react'

import { FoobarPluginState } from '.'

export class FoobarRenderer extends React.Component<FoobarRendererProps> {
  public render() {
    const { state } = this.props
    return <div>{state}</div>
  }
}

export interface FoobarRendererProps {
  state: FoobarPluginState
}
