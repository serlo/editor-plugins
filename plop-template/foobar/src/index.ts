import {
  {{properCase name}}PluginState
} from '@serlo/editor-plugin-{{dashCase name}}-renderer'
import { Plugin } from '@splish-me/editor'

import { {{properCase name}}Editor } from './editor'

export const {{camelCase name}}Plugin: Plugin<{{properCase name}}PluginState> = {
  Component: {{properCase name}}Editor,
  text: '{{name}}',

  createInitialState: (): {{properCase name}}PluginState => {
    return {
      foo: 'bar'
    }
  }
}
