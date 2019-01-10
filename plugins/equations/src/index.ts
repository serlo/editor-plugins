import { EquationsPluginState } from '@serlo/editor-plugin-equations-renderer'

import { EquationsEditor } from './editor'

export const equationsPlugin = {
  name: '@serlo-org/equations',
  version: '0.0.0',
  Component: EquationsEditor,
  text: 'Gleichungssystem',
  createInitialState: (): EquationsPluginState => {
    return {
      steps: []
    }
  }
}
