import { RendererPlugin } from '@splish-me/editor'

import { HighlightRenderer } from './renderer'

export const highlightRendererPlugin: RendererPlugin<HighlightPluginState> = {
  Component: HighlightRenderer
}

export interface HighlightPluginState {
  text?: string
  language?: string
  lineNumbers?: boolean
}

export * from './renderer'
