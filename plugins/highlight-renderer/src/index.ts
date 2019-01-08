import { HighlightRenderer } from './renderer'

export const highlightRendererPlugin = {
  name: '@serlo-org/highlight',
  version: '0.0.0',
  Component: HighlightRenderer
}

export interface HighlightPluginState {
  text?: string
  language?: string
  lineNumbers?: boolean
}

export * from './renderer'
