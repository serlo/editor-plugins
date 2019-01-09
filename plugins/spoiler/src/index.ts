import { SpoilerPluginState } from '@serlo-org/editor-plugin-spoiler-renderer'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'

import { SpoilerEditor } from './editor'

export const spoilerPlugin = {
  name: '@serlo-org/spoiler',
  version: '0.0.4',
  Component: SpoilerEditor,
  text: 'Lösung',
  createInitialState: (): SpoilerPluginState => ({
    content: createDocumentIdentifier(),
    title: ''
  })
}
