import { SolutionPluginState } from '@serlo/editor-plugin-solution-renderer'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'

import { SolutionEditor } from './editor'

export const solutionPlugin = {
  name: '@serlo-org/solution',
  version: '0.0.2',
  Component: SolutionEditor,
  text: 'Lösung',
  createInitialState: (): SolutionPluginState => ({
    content: createDocumentIdentifier()
  })
}
