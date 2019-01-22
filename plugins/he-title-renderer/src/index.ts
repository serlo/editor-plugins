
import { HeTitleRenderer } from './renderer'

export const heTitleRendererPlugin = {
  Component: HeTitleRenderer
}

export interface HeTitlePluginState {
  content: string,
}

export * from './renderer'
