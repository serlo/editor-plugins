
import { HeTitleRenderer } from './renderer'

export const heTitleRendererPlugin = {
  name: '@serlo/editor-plugin-he-title',
  version: '0.1.0',
  Component: HeTitleRenderer
}

export interface HeTitlePluginState {
  content: string,
}

export * from './renderer'
