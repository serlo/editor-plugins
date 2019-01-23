import { HintPluginState } from '@serlo/editor-plugin-hint-renderer'
import { createDocumentIdentifier, Plugin } from '@splish-me/editor'

import { HintEditor } from './editor'

export const hintPlugin: Plugin<HintPluginState> = {
  Component: HintEditor,
  text: 'Tipp',
  createInitialState: (): HintPluginState => ({
    content: createDocumentIdentifier()
  })
}
