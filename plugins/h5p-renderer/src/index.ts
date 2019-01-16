import { H5pRenderer } from './renderer'

export const h5pRendererPlugin = {
  name: '@serlo-org/h5p',
  version: '0.0.0',
  Component: H5pRenderer
}

export interface H5pPluginState {
  src?: string
}

export * from './renderer'
