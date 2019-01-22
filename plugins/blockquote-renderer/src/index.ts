import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'

import { BlockquoteRenderer } from './renderer'

export const blockquoteRendererPlugin: RendererPlugin<BlockquotePluginState> = {
  Component: BlockquoteRenderer
}

export interface BlockquotePluginState {
  child: DocumentIdentifier
}

export * from './renderer'
