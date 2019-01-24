
import { Document } from '@splish-me/editor'
import { HeHeadingRenderer } from './renderer'
import { RendererPlugin } from '@splish-me/editor'

export const heHeadingRendererPlugin: RendererPlugin<HeHeadingPluginState> = {
  Component: HeHeadingRenderer
}

export interface HeHeadingPluginState {
  caption: Document,
  content: Array<Document>,
}

export * from './renderer'
