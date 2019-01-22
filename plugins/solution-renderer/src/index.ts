import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'

import { SolutionRenderer } from './renderer'

export const solutionRendererPlugin: RendererPlugin<SolutionPluginState> = {
  Component: SolutionRenderer
}

export interface SolutionPluginState {
  title?: string
  content: DocumentIdentifier
}

export * from './renderer'
