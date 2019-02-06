import { createAlphabetSortEditor } from './editor'
import { ImagePluginConfig } from '@serlo/editor-plugin-image'

export const createAlphabetSortPlugin = (config: ImagePluginConfig) => {
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
