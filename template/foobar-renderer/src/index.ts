import { FoobarRenderer } from './renderer'

export const foobarRendererPlugin = {
  name: '@serlo-org/foobar',
  version: '0.0.0',
  Component: FoobarRenderer
}

export interface FoobarPluginState {
  foo: string
}

export * from './renderer'
