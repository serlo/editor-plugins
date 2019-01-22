import { Plugin } from '@serlo/editor-plugins-registry'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

const plugin = Plugin.Table

storiesOf('Markdown Table', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })
    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin,
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
      plugin,
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
