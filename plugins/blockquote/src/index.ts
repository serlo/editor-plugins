import { createDocumentIdentifier, Plugin } from '@splish-me/editor'

import {
  BlockquotePluginState,
  BlockquoteRenderer
} from '@serlo/editor-plugin-blockquote-renderer'

export const blockquotePlugin: Plugin<BlockquotePluginState> = {
  Component: BlockquoteRenderer as Plugin<BlockquotePluginState>['Component'],
  text: 'Blockquote',

  createInitialState: (): BlockquotePluginState => ({
    child: createDocumentIdentifier()
  })
}
