import { hintPlugin } from '@serlo/editor-plugin-hint'
import { hintRendererPlugin } from '@serlo/editor-plugin-hint-renderer'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

storiesOf('Hint', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin: hintPlugin })

    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin: hintPlugin,
      initialState: {
        title: 'Foobar',
        content: createDocumentIdentifier()
      }
    })

    return renderEditor(content)
  })
  .add('Renderer', () => {
    const content = createStateForContentPlugin({
      plugin: hintRendererPlugin,
      initialState: {
        title: 'Foobar',
        content: createDocumentIdentifier()
      }
    })

    return renderRenderer(content)
  })
