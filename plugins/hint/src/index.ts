import { HintPluginState } from '@serlo-org/editor-plugin-hint-renderer'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'

import { HintEditor } from './editor'

export const hintPlugin = {
  name: '@serlo-org/hint',
  version: '0.0.3',
  Component: HintEditor,
  text: 'Tipp',
  createInitialState: (): HintPluginState => ({
    content: createDocumentIdentifier()
  })
}
