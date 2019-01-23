import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'
import { storiesOf } from '@storybook/react'

import { inputExercisePlugin } from '@serlo/editor-plugin-input-exercise'
import { inputExerciseRendererPlugin } from '@serlo/editor-plugin-input-exercise-renderer'

storiesOf('InputTextExercise', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin: inputExercisePlugin })

    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin: inputExercisePlugin,
      initialState: {
        type: 'Text',
        correctAnswers: [{ value: '1' }],
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
      plugin: inputExerciseRendererPlugin,
      initialState: { alt: 'Dreiecke konstruieren', src: '1571395' }
    })

    return renderRenderer(content)
  })
