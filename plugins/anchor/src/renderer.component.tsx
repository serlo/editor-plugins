import * as React from 'react'
import { AnchorProps } from './editor.component'

export class AnchorRenderer extends React.Component<AnchorProps> {
  render() {
    return <div id={this.props.state.id} style={{ visibility: 'hidden' }} />
  }
}
