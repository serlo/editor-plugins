
import {
  HeHeadingPluginState,
  HeHeadingRenderer
} from '@serlo/editor-plugin-he-heading-renderer'

import { HeHeadingEditor } from './editor'
import { Plugin } from '@splish-me/editor'

export const heHeadingPlugin: Plugin<HeHeadingPluginState> = {
  Component: HeHeadingEditor,
  text: 'Heading',

  createInitialState: (): any => (
    {"caption":{"type":"@splish-me/editor-core/editable","state":{"id":"00000000-0000-0000-0000-000000000000","cells":[{"id":"00000000-0000-0000-0000-000000000001","content":{"plugin":{"name":"@serlo/editor-plugin-he-title","version":"0.1.0"},"state":{"content":"use plain title text here!"}},"rows":null}]}},"content":[]}
  )
}
