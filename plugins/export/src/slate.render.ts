import { defaultPlugins } from '@splish-me/editor-plugin-slate/lib/default-plugins'
import { createSlateRenderPlugin } from '@splish-me/editor-plugin-slate/lib/index.render'

import { createKatexPlugin } from './slate-plugin-katex'

const plugins = [...defaultPlugins, createKatexPlugin()]

export const slateRenderPlugin = createSlateRenderPlugin({ plugins })
