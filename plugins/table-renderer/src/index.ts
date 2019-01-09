import { TableRenderer } from './renderer'

export const tableRendererPlugin = {
  name: '@serlo-org/table',
  version: '0.0.2',
  Component: TableRenderer
}

export interface TablePluginState {
  src: string
}

export * from './renderer'
