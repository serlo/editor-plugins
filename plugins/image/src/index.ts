import { ImagePluginState } from '@serlo-org/editor-plugin-image-renderer'

import { createImageEditor } from './editor'
import { UploadConfig } from './upload'

export const createImagePlugin = (config: ImagePluginConfig) => ({
  name: '@splish-me/image',
  version: '0.0.5',
  Component: createImageEditor(config),
  text: 'Bild',
  createInitialState: (): ImagePluginState => ({
    src: '',
    description: ''
  })
})

export interface ImagePluginConfig {
  upload: UploadConfig
}
