import { HighlightPluginState } from '@serlo/editor-plugin-highlight-renderer'
import { Plugin } from '@splish-me/editor'

import { HighlightEditor } from './editor'

export const highlightPlugin: Plugin<HighlightPluginState> = {
  Component: HighlightEditor,
  text: 'Code Highlight',
  createInitialState: () => {
    return {}
  }
}
