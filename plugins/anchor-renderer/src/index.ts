import { AnchorRenderer } from './renderer'

export const anchorRendererPlugin = {
  name: '@serlo-org/anchor',
  version: '0.0.0',
  Component: AnchorRenderer
}

export interface AnchorPluginState {
  id: string
}

export * from './renderer'
