
import { HeTitleRenderer } from './renderer'
import { RendererPlugin } from '@splish-me/editor'

export const heTitleRendererPlugin: RendererPlugin<HeTitlePluginState> = {
  Component: HeTitleRenderer
}

export interface HeTitlePluginState {
  content: string,
}

export * from './renderer'
