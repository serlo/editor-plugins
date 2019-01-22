import { RendererPlugin } from '@splish-me/editor'

import { TableRenderer } from './renderer'

export const tableRendererPlugin: RendererPlugin<TablePluginState> = {
  Component: TableRenderer
}

export interface TablePluginState {
  src: string
}

export * from './renderer'
