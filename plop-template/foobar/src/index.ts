import {
  {{properCase name}}PluginState,
  {{properCase name}}Renderer
} from '@serlo/editor-plugin-{{dashCase name}}-renderer'
import { Plugin } from '@splish-me/editor'

import { {{properCase name}}Editor } from './editor'

export const {{camelCase name}}Plugin: Plugin<{{properCase name}}PluginState> = {
  name: '@serlo-org/{{dashCase name}}',
  version: '0.0.0',
  Component: {{properCase name}}Editor,
  text: '{{name}}',

  createInitialState: (): {{properCase name}}PluginState => {
    return {
      foo: 'bar'
    }
  }
}
