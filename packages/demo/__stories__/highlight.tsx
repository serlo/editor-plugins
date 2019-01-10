import { highlightPlugin } from '@serlo-org/editor-plugin-highlight'
import { highlightRendererPlugin } from '@serlo-org/editor-plugin-highlight-renderer'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo-org/storybook-helpers'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

storiesOf('Code Highlight', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin: highlightPlugin })

    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin: highlightPlugin,
      initialState: {
        language: 'javascript',
        text: `console.log('hello world')`
      }
    })

    return renderEditor(content)
  })
  .add('Renderer (w/o line numbers)', () => {
    const content = createStateForContentPlugin({
      plugin: highlightRendererPlugin,
      initialState: {
        language: 'javascript',
        text: `console.log('hello world')`
      }
    })

    return renderRenderer(content)
  })
  .add('Renderer (w/ line numbers)', () => {
    const content = createStateForContentPlugin({
      plugin: highlightRendererPlugin,
      initialState: {
        language: 'javascript',
        text: `console.log('hello world')`,
        lineNumbers: true
      }
    })

    return renderRenderer(content)
  })
