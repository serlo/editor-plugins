import { ImagePluginState } from '@serlo/editor-plugin-image-renderer'
import { Plugin } from '@splish-me/editor'

import { createImageEditor } from './editor'
import { UploadConfig } from './upload'

export const createImagePlugin = (
  config: ImagePluginConfig
): Plugin<ImagePluginState> => {
  return {
    Component: createImageEditor(config),
    text: 'Bild',
    createInitialState: (): ImagePluginState => ({
      src: '',
      description: ''
    })
  }
}

export interface ImagePluginConfig {
  upload: UploadConfig
}
