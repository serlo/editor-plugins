
import { HeMarkdownRenderer } from './renderer'

export const heMarkdownRendererPlugin = {
  Component: HeMarkdownRenderer
}

export interface HeMarkdownPluginState {
  content: string,
}

export * from './renderer'
