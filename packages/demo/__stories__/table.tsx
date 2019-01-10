import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { tablePlugin } from '@serlo/editor-plugin-table'
import { tableRendererPlugin } from '@serlo/editor-plugin-table-renderer'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

storiesOf('Markdown Table', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin: tablePlugin })
    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin: tablePlugin,
      initialState: {
        src: `| col1 | col2 |
| ------ | ----------- |
| ex1 | longer text than the rest |
| some more lines | |
| empty second |`
      }
    })
    return renderEditor(content)
  })
  .add('Renderer', () => {
    const content = createStateForContentPlugin({
      plugin: tableRendererPlugin,
      initialState: {
        src: `| col1 | col2 |
| ------ | ----------- |
| ex1 | longer text than the rest |
| some more lines | |
| empty second |`
      }
    })
    return renderRenderer(content)
  })
