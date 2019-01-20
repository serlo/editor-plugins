
import { HeTitlePluginState } from '@serlo/editor-plugin-he-title-renderer'
import { Document } from '@splish-me/editor-core-document'
import { HeHeadingRenderer } from './renderer'

export const heHeadingRendererPlugin = {
  name: '@serlo/editor-plugin-he-heading',
  version: '0.1.0',
  Component: HeHeadingRenderer
}

export interface HeHeadingPluginState {
  caption: HeTitlePluginState,
  content: Array<Document>,
}

export * from './renderer'
