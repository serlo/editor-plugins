import { RendererPlugin } from '@splish-me/editor'

import { AnchorRenderer } from './renderer'

export const anchorRendererPlugin: RendererPlugin<AnchorPluginState> = {
  Component: AnchorRenderer
}

export interface AnchorPluginState {
  id: string
}

export * from './renderer'
