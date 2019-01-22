import { AlphabetSortRenderer } from './renderer'

export const alphabetSortRendererPlugin = {
  name: '@serlo-org/foobar',
  version: '0.0.0',
  Component: AlphabetSortRenderer
}

export interface FoobarPluginState {
  foo: string
}

export * from './renderer'
