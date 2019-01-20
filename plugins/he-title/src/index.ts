
import {
  HeTitlePluginState,
  HeTitleRenderer
} from '@serlo/editor-plugin-he-title-renderer'

import { HeTitleEditor } from './editor'

export const heTitlePlugin = {
  name: '@serlo/editor-plugin-he-title',
  version: '0.1.0',
  Component: HeTitleEditor,
  text: 'Title',

  /*
  createInitialState: (): HeTitlePluginState => {
    return {"content":""}
  }
  */
}
