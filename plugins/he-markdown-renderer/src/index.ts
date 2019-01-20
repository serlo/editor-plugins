
import { HeMarkdownRenderer } from './renderer'

export const heMarkdownRendererPlugin = {
  name: '@serlo/editor-plugin-he-markdown',
  version: '0.1.0',
  Component: HeMarkdownRenderer
}

export interface HeMarkdownPluginState {
  content: string,
}

export * from './renderer'
