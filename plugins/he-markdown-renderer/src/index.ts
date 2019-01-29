
import { HeMarkdownRenderer } from './renderer'
import { RendererPlugin } from '@splish-me/editor'

export const heMarkdownRendererPlugin: RendererPlugin<HeMarkdownPluginState> = {
  Component: HeMarkdownRenderer
}

export interface HeMarkdownPluginState {
  content: string
}

export * from './renderer'
