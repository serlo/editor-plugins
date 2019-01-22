import { Plugin } from '@serlo/editor-plugins-registry'
import {
  createStateForContentPlugin,
  renderEditor
} from '@serlo/storybook-helpers'
import { createDocumentIdentifier } from '@splish-me/editor'
import { storiesOf } from '@storybook/react'

const plugin = Plugin.Equations

storiesOf('Equations', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })
    return renderEditor(content)
  })
  .add('Editable mit content', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        steps: [
          {
            left: createDocumentIdentifier(),
            right: createDocumentIdentifier(),
            transform: createDocumentIdentifier()
          },
          {
            left: createDocumentIdentifier(),
            right: createDocumentIdentifier(),
            transform: createDocumentIdentifier()
          }
        ]
      }
    })
    return renderEditor(content)
  })
