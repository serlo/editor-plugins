import { SpoilerPluginState } from '@serlo/editor-plugin-spoiler-renderer'
import { createDocumentIdentifier, Plugin } from '@splish-me/editor'

import { SpoilerEditor } from './editor'

export const spoilerPlugin: Plugin<SpoilerPluginState> = {
  Component: SpoilerEditor,
  text: 'Spoiler',
  createInitialState: (): SpoilerPluginState => ({
    content: createDocumentIdentifier(),
    title: ''
  })
}
