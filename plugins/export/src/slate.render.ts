import { defaultPlugins } from '@splish-me/editor-plugin-slate/lib/default-plugins'
import { createKatexPlugin } from '@splish-me/editor-plugin-slate/lib/plugins/katex'
import { createSlateRenderPlugin } from '@splish-me/editor-plugin-slate/lib/index.render'

const plugins = [...defaultPlugins, createKatexPlugin()]

export const slateRenderPlugin = createSlateRenderPlugin({ plugins })
