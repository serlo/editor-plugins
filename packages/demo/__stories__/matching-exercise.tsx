import { Plugin } from '@serlo/editor-plugins-registry'
import { MatchingExerciseRenderer } from '@serlo/editor-plugin-matching-exercise-renderer'
import { createDocumentIdentifier } from '@splish-me/editor'
import {
  createStateForContentPlugin,
  renderEditor
} from '@serlo/storybook-helpers'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

const plugin = Plugin.MatchingExercise

storiesOf('Matching Exercise/Renderer', module)
  .add('Funktion/Ableitung', () => {
    return (
      <MatchingExerciseRenderer
        state={{
          solution: [[0, 1], [1, 2]],
          //blockContent: ['2x + 2', '2', '0']
          blockContent: [
            createDocumentIdentifier('2x+2'),
            createDocumentIdentifier('2'),
            createDocumentIdentifier('0')
          ]
        }}
      />
    )
  })
  .add('Funktion/Ableitung (2)', () => {
    return (
      <MatchingExerciseRenderer
        state={{
          solution: [[0, 1], [1, 2]],
          // blockContent: ['2x + 2', '2', '0','5x]
          blockContent: [
            createDocumentIdentifier('2x+2'),
            createDocumentIdentifier('2'),
            createDocumentIdentifier('0'),
            createDocumentIdentifier('5x')
          ]
        }}
      />
    )
  })

storiesOf('Matching Exercise', module).add('Editable (initial state)', () => {
  const content = createStateForContentPlugin({ plugin })

  return renderEditor(content)
})
