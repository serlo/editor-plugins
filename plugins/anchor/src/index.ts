import { AnchorPluginState } from '@serlo/editor-plugin-anchor-renderer'
import { Plugin } from '@splish-me/editor'

import { AnchorEditor } from './editor'

export const anchorPlugin: Plugin<AnchorPluginState> = {
  Component: AnchorEditor,
  text: 'Anchor',
  createInitialState: () => {
    return {
      id: ''
    }
  }
}
