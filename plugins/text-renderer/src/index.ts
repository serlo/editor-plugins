import { createCodePlugin } from '@splish-me/editor-plugin-text-plugin-code'
import { createHeadingsPlugin } from '@splish-me/editor-plugin-text-plugin-headings'
import { createLinkPlugin } from '@splish-me/editor-plugin-text-plugin-link'
import { createRichTextPlugin } from '@splish-me/editor-plugin-text-plugin-rich-text'
import { createParagraphPlugin } from '@splish-me/editor-plugin-text-plugin-paragraph'
import { createListsPlugin } from '@splish-me/editor-plugin-text-plugin-lists'
import { createTextRendererPlugin } from '@splish-me/editor-plugin-text-renderer'

import { createKatexPlugin } from './katex'

export * from './katex'

export const plugins = [
  createParagraphPlugin(),
  createRichTextPlugin(),
  createLinkPlugin(),
  createHeadingsPlugin(),
  createCodePlugin(),
  createListsPlugin(),
  createKatexPlugin()
]

export const textRendererPlugin = createTextRendererPlugin({ plugins })
