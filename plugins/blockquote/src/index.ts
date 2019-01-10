import { createDocumentIdentifier } from '@splish-me/editor-core-document'

import {
  BlockquotePluginState,
  BlockquoteRenderer
} from '@serlo/editor-plugin-blockquote-renderer'

export const blockquotePlugin = {
  name: '@serlo-org/blockquote',
  version: '0.0.0',
  Component: BlockquoteRenderer,
  text: 'Blockquote',

  createInitialState: (): BlockquotePluginState => ({
    child: createDocumentIdentifier()
  })
}
