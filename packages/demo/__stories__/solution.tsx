import { createDocumentIdentifier } from '@splish-me/editor-core-document'
import { solutionPlugin } from '@serlo/editor-plugin-solution'
import { solutionRendererPlugin } from '@serlo/editor-plugin-solution-renderer'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { storiesOf } from '@storybook/react'
import { createEmptyState } from 'ory-editor-core'
import * as React from 'react'

storiesOf('Solution', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin: solutionPlugin })

    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin: solutionPlugin,
      initialState: {
        title: 'Foobar',
        content: createDocumentIdentifier()
      }
    })

    return renderEditor(content)
  })
  .add('Renderer', () => {
    const content = createStateForContentPlugin({
      plugin: solutionRendererPlugin,
      initialState: {
        title: 'Foobar',
        content: {
          type: '@splish-me/editor-core/editable',
          state: createEmptyState()
        }
      }
    })

    return renderRenderer(content)
  })
