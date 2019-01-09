import { DocumentIdentifier } from '@splish-me/editor-core-types'

import { SolutionRenderer } from './renderer'

export const solutionRendererPlugin = {
  name: '@serlo-org/solution',
  version: '0.0.2',
  Component: SolutionRenderer
}

export interface SolutionPluginState {
  title?: string
  content: DocumentIdentifier
}

export * from './renderer'
