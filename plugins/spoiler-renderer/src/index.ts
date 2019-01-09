import { DocumentIdentifier } from '@splish-me/editor-core-types'

import { SpoilerRenderer } from './renderer'

export const spoilerRendererPlugin = {
  name: '@serlo-org/spoiler',
  version: '0.0.4',
  Component: SpoilerRenderer
}

export interface SpoilerPluginState {
  content: DocumentIdentifier
  title: string
}

export * from './renderer'
