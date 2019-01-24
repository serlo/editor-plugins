import * as React from 'react'
import { HeHeadingPluginState } from '.'
import { Document, DocumentIdentifier } from '@splish-me/editor'

const renderChildren = (plugin: DocumentIdentifier) => {
  return <Document state={plugin} initialState={plugin} key={plugin.id} />
}

export class HeHeadingRenderer extends React.Component<HeHeadingRendererProps> {
  render() {
    let caption = renderChildren(this.props.state.caption)
    let content = this.props.state.content.map(renderChildren)
    let rendered = (
      <section>
        <h2>{caption}</h2>
        {content}
      </section>
    )
    return rendered
  }
}

export interface HeHeadingRendererProps {
  state: HeHeadingPluginState
}
