import {
  FoobarPluginState,
  FoobarRenderer
} from '@serlo-org/editor-plugin-foobar-renderer'

import { FoobarEditor } from './editor'

export const foobarPlugin = {
  name: '@serlo-org/foobar',
  version: '0.0.0',
  Component: FoobarEditor,
  text: 'Foobar',

  createInitialState: (): FoobarPluginState => {
    return {
      foo: 'bar'
    }
  }
}
