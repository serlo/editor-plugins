import { {{properCase name}}Renderer } from './renderer'

export const {{camelCase name}}RendererPlugin = {
  name: '@serlo-org/{{dashCase name}}',
  version: '0.0.0',
  Component: {{properCase name}}Renderer
}

export interface {{properCase name}}PluginState {
  foo: string
}

export * from './renderer'
