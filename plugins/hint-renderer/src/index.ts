import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'

import { HintRenderer } from './renderer'

export const hintRendererPlugin: RendererPlugin<HintPluginState> = {
  Component: HintRenderer
}

export interface HintPluginState {
  title?: string
  content: DocumentIdentifier
}

export * from './renderer'
