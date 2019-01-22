import { H5pPluginState } from '@serlo/editor-plugin-h5p-renderer'
import { Plugin } from '@splish-me/editor'

import { H5pEditor } from './editor'

export const h5pPlugin: Plugin<H5pPluginState> = {
  Component: H5pEditor,
  text: 'H5P',
  createInitialState: () => {
    return {
      src: ''
    }
  }
}
