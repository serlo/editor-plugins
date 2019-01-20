
import {
  HeMarkdownPluginState,
  HeMarkdownRenderer
} from '@serlo/editor-plugin-he-markdown-renderer'

import { HeMarkdownEditor } from './editor'

export const heMarkdownPlugin = {
  name: '@serlo/editor-plugin-he-markdown',
  version: '0.1.0',
  Component: HeMarkdownEditor,
  text: 'Formatted Text',

  /*
  createInitialState: (): HeMarkdownPluginState => {
    return {"content":""}
  }
  */
}
