import { TablePluginState } from '@serlo/editor-plugin-table-renderer'
import { Plugin } from '@splish-me/editor'

import { TableEditor } from './editor'

export const tablePlugin: Plugin<TablePluginState> = {
  Component: TableEditor,
  text: 'Table',
  createInitialState: () => {
    return {
      src: ''
    }
  }
}
