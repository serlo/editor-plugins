import { DocumentIdentifier } from '@splish-me/editor-core-types'

import { StepByStepRenderer } from './renderer'

export const stepByStepRendererPlugin = {
  name: '@serlo-org/step-by-step',
  version: '0.0.0',
  Component: StepByStepRenderer
}

export interface StepByStepPluginState {
  steps: Array<Step | Content>
}

export interface Step {
  type: 'step'
  content: DocumentIdentifier
  explanation: DocumentIdentifier
}

export interface Content {
  type: 'content'
  content: DocumentIdentifier
}

export * from './renderer'
