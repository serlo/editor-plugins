import { Document } from '@splish-me/editor-core-document'
import * as React from 'react'

import { LicensePluginState } from '.'

export class LicenseRenderer extends React.Component<LicenseRendererProps> {
  render() {
    const { state } = this.props

    return <Document state={state.content} />
  }
}

export interface LicenseRendererProps {
  state: LicensePluginState
}
