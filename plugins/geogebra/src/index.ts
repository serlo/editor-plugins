import { GeogebraPluginState } from '@serlo/editor-plugin-geogebra-renderer'
import { Plugin } from '@splish-me/editor'

import { GeogebraEditor } from './editor'

export const geogebraPlugin: Plugin<GeogebraPluginState> = {
  Component: GeogebraEditor,
  text: 'GeoGebra',
  createInitialState: () => {
    return {
      src: ''
    }
  }
}
