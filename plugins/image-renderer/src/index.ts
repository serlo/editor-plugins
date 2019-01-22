import { RendererPlugin } from '@splish-me/editor'

import { ImageRenderer } from './renderer'

export const createImageRendererPlugin = (): RendererPlugin<
  ImagePluginState
> => {
  return {
    Component: ImageRenderer
  }
}

export interface ImagePluginState {
  src: string
  description: string
  href?: string
  target?: string
  rel?: string
}

export * from './renderer'
