import { Plugin } from '@splish-me/editor'
import { EquationsPluginState } from '@serlo/editor-plugin-equations-renderer'

import { EquationsEditor } from './editor'

export const equationsPlugin: Plugin<EquationsPluginState> = {
  Component: EquationsEditor,
  text: 'Gleichungssystem',
  createInitialState: (): EquationsPluginState => {
    return {
      steps: []
    }
  }
}
