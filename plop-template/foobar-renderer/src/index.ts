import { RendererPlugin } from '@splish-me/editor'

import { {{properCase name}}Renderer } from './renderer'

export const {{camelCase name}}RendererPlugin: RendererPlugin<{{properCase name}}PluginState > = {
  name: '@serlo-org/{{dashCase name}}',
  version: '0.0.0',
  Component: {{properCase name}}Renderer
}

export interface {{properCase name}}PluginState {
  foo: string
}

export * from './renderer'
