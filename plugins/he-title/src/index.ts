
import {
  HeTitlePluginState,
  HeTitleRenderer
} from '@serlo/editor-plugin-he-title-renderer'

import { HeTitleEditor } from './editor'

export const heTitlePlugin = {
  Component: HeTitleEditor,
  text: 'Title',

  /*
  createInitialState: (): HeTitlePluginState => {
    return {"content":""}
  }
  */
}
