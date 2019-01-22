
import {
  HeMarkdownPluginState,
  HeMarkdownRenderer
} from '@serlo/editor-plugin-he-markdown-renderer'

import { HeMarkdownEditor } from './editor'

export const heMarkdownPlugin = {
  Component: HeMarkdownEditor,
  text: 'Formatted Text',

  /*
  createInitialState: (): HeMarkdownPluginState => {
    return {"content":""}
  }
  */
}
