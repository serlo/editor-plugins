
import {
  HeTitlePluginState,
  HeTitleRenderer
} from '@serlo/editor-plugin-he-title-renderer'

import { HeTitleEditor } from './editor'
import { Plugin } from '@splish-me/editor'

export const heTitlePlugin: Plugin<HeTitlePluginState> = {
  Component: HeTitleEditor,
  text: 'Title',

  createInitialState: (): HeTitlePluginState => {
    return {"content":"use plain title text here!"}
  }
}
