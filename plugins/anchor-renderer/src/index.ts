import { AnchorRenderer } from './renderer'

export const anchorRendererPlugin = {
  name: 'anchor',
  version: '0.0.0',
  Component: AnchorRenderer
}

export interface AnchorPluginState {
  id: string
}

export * from './renderer'
