import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'

import { StepByStepRenderer } from './renderer'

export const stepByStepRendererPlugin: RendererPlugin<StepByStepPluginState> = {
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
