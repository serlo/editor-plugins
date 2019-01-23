import { RendererPlugin } from '@splish-me/editor'

import { GeogebraRenderer } from './renderer'

export const geogebraRendererPlugin: RendererPlugin<GeogebraPluginState> = {
  Component: GeogebraRenderer
}

export interface GeogebraPluginState {
  src: string
}

export * from './renderer'
