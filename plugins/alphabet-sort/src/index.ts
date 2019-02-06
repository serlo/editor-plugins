import { UploadConfig } from '@serlo/editor-plugin-image'

import { createAlphabetSortEditor } from './editor'

export const createAlphabetSortPlugin = (config: AlphabetSortPluginConfig) => {
  return {
    Component: createAlphabetSortEditor(config),
    text: 'Alphabet Sort',
    createInitialState: () => {
      return {
        contacts: []
      }
    }
  }
}

export interface AlphabetSortPluginConfig {
  upload: UploadConfig
}
