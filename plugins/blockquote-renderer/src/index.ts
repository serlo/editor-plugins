import { DocumentIdentifier } from '@splish-me/editor-core-types'
import { BlockquoteRenderer } from './renderer'

export const blockquoteRendererPlugin = {
  name: '@serlo-org/blockquote',
  version: '0.0.0',
  Component: BlockquoteRenderer
}

export interface BlockquotePluginState {
  child: DocumentIdentifier
}

export * from './renderer'
