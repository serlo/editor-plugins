import { DocumentIdentifier } from '@splish-me/editor-core-types'

import { EquationsRenderer } from './renderer'

export const equationsRendererPlugin = {
  name: '@serlo-org/equations',
  version: '0.0.0',
  Component: EquationsRenderer
}

export interface EquationsPluginState {
  steps: Step[]
}

export interface Step {
  left: DocumentIdentifier
  right: DocumentIdentifier
  transform: DocumentIdentifier
}

export * from './renderer'
