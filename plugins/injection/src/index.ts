import { InjectionPluginState } from '@serlo/editor-plugin-injection-renderer'
import { Plugin } from '@splish-me/editor'

import { InjectionEditor } from './editor'

export const injectionPlugin: Plugin<InjectionPluginState> = {
  Component: InjectionEditor,
  text: 'Injection',
  createInitialState: (): InjectionPluginState => {
    return {
      src: '',
      alt: ''
    }
  }
}
