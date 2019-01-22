import { Plugin } from '@serlo/editor-plugins-registry'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { createDocumentIdentifier } from '@splish-me/editor'
import { storiesOf } from '@storybook/react'

const plugin = Plugin.InputExercise

storiesOf('InputTextExercise', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })

    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        type: 'Text',
        correctValue: '1',
        wrongAnswers: [
          {
            id: 1,
            value: '2',
            feedback: createDocumentIdentifier()
          }
        ]
      }
    })

    return renderEditor(content)
  })
  .add('Renderer', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: { alt: 'Dreiecke konstruieren', src: '1571395' }
    })

    return renderRenderer(content)
  })
