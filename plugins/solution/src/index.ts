import { SolutionPluginState } from '@serlo/editor-plugin-solution-renderer'
import { createDocumentIdentifier, Plugin } from '@splish-me/editor'

import { SolutionEditor } from './editor'

export const solutionPlugin: Plugin<SolutionPluginState> = {
  Component: SolutionEditor,
  text: 'Lösung',
  createInitialState: (): SolutionPluginState => ({
    content: createDocumentIdentifier()
  })
}
