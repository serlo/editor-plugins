import { ImageRenderer } from './renderer'

export const createImageRendererPlugin = () => {
  return {
    name: '@splish-me/image',
    version: '0.0.5',
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
