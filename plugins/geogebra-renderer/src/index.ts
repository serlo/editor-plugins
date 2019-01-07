import { GeogebraRenderer } from './renderer'

export const geogebraRendererPlugin = {
  name: '@serlo-org/geogebra',
  version: '0.0.5',
  Component: GeogebraRenderer
}

export interface GeogebraPluginState {
  src?: string
}

export * from './renderer'
