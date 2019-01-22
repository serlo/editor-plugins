import { Plugin } from '@serlo/editor-plugins-registry'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

const plugin = Plugin.Highlight

storiesOf('Code Highlight', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })

    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        language: 'javascript',
        text: `console.log('hello world')`
      }
    })

    return renderEditor(content)
  })
  .add('Renderer (w/o line numbers)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        language: 'javascript',
        text: `console.log('hello world')`
      }
    })

    return renderRenderer(content)
  })
  .add('Renderer (w/ line numbers)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        language: 'javascript',
        text: `console.log('hello world')`,
        lineNumbers: true
      }
    })

    return renderRenderer(content)
  })
