import * as React from 'react'
import { HeHeadingPluginState } from '.'
import {
    Document,
    createDocumentIdentifier
} from '@splish-me/editor'

const renderChildren = (plugin) => {
  let eid = createDocumentIdentifier((plugin as any).id);
  return (<Document state={eid} initialState={plugin} key={(plugin as any).id}/>);
}

export class HeHeadingRenderer extends React.Component<HeHeadingRendererProps> {
  render() {
    let caption = renderChildren(this.props.state.caption);
    let content = this.props.state.content.map(renderChildren);
    let rendered = (<section><h2>{caption}</h2>{content}</section>);
    return rendered;
  }
}

export interface HeHeadingRendererProps {
    state: HeHeadingPluginState
}
