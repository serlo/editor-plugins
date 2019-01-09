import { InjectionPluginState } from '@serlo-org/editor-plugin-injection-renderer'

import { InjectionEditor } from './editor'

export const injectionPlugin = {
  name: '@serlo-org/injection',
  version: '0.0.2',
  Component: InjectionEditor,
  text: 'Injection',
  createInitialState: (): InjectionPluginState => {
    return {
      src: '',
      alt: ''
    }
  }
}
