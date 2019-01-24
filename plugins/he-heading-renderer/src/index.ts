import { DocumentIdentifier } from '@splish-me/editor'
import { HeHeadingRenderer } from './renderer'
import { RendererPlugin } from '@splish-me/editor'

export const heHeadingRendererPlugin: RendererPlugin<HeHeadingPluginState> = {
  Component: HeHeadingRenderer
}

export interface HeHeadingPluginState {
  caption: DocumentIdentifier
  content: Array<DocumentIdentifier>
}

export * from './renderer'
