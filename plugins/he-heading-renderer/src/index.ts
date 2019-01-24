
import { HeTitlePluginState } from '@serlo/editor-plugin-he-title-renderer'
import { Document } from '@splish-me/editor-core-document'
import { HeHeadingRenderer } from './renderer'
import { RendererPlugin } from '@splish-me/editor'

export const heHeadingRendererPlugin: RendererPlugin<HeHeadingPluginState> = {
  Component: HeHeadingRenderer
}

export interface HeHeadingPluginState {
  caption: HeTitlePluginState,
  content: Array<Document>,
}

export * from './renderer'
