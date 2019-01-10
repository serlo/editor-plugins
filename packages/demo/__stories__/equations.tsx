import { equationsPlugin as plugin } from '@serlo/editor-plugin-equations'
import {
  createStateForContentPlugin,
  renderEditor
} from '@serlo/storybook-helpers'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'
import { storiesOf } from '@storybook/react'

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
