import { RendererPlugin } from '@splish-me/editor'

import { InjectionRenderer } from './renderer'

export const injectionRendererPlugin: RendererPlugin<InjectionPluginState> = {
  Component: InjectionRenderer
}

export interface InjectionPluginState {
  src: string
  alt: string
}

export * from './renderer'
