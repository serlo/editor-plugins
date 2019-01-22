import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'

import { SpoilerRenderer } from './renderer'

export const spoilerRendererPlugin: RendererPlugin<SpoilerPluginState> = {
  Component: SpoilerRenderer
}

export interface SpoilerPluginState {
  content: DocumentIdentifier
  title: string
}

export * from './renderer'
