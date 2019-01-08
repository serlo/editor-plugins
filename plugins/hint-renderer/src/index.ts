import { DocumentIdentifier } from '@splish-me/editor-core-types'

import { HintRenderer } from './renderer'

export const hintRendererPlugin = {
  name: '@serlo-org/hint',
  version: '0.0.3',
  Component: HintRenderer
}

export interface HintPluginState {
  title?: string
  content: DocumentIdentifier
}

export * from './renderer'
