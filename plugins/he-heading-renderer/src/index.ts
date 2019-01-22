
import { HeTitlePluginState } from '@serlo/editor-plugin-he-title-renderer'
import { Document } from '@splish-me/editor'
import { HeHeadingRenderer } from './renderer'

export const heHeadingRendererPlugin = {
  Component: HeHeadingRenderer
}

export interface HeHeadingPluginState {
  caption: HeTitlePluginState,
  content: Array<Document>,
}

export * from './renderer'
