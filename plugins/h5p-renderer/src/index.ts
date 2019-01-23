import { RendererPlugin } from '@splish-me/editor'

import { H5pRenderer } from './renderer'

export const h5pRendererPlugin: RendererPlugin<H5pPluginState> = {
  Component: H5pRenderer
}

export interface H5pPluginState {
  src: string
}

export * from './renderer'
