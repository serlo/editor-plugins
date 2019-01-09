import { InjectionRenderer } from './renderer'

export const injectionRendererPlugin = {
  name: '@serlo-org/injection',
  version: '0.0.2',
  Component: InjectionRenderer
}

export interface InjectionPluginState {
  src: string
  alt: string
}

export * from './renderer'
