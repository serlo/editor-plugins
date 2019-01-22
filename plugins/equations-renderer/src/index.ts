import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'

import { EquationsRenderer } from './renderer'

export const equationsRendererPlugin: RendererPlugin<EquationsPluginState> = {
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
