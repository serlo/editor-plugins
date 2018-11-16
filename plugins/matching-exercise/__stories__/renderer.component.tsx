import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  createStateForContentPlugin,
  renderEditable,
  renderHTMLRenderer
} from '../../../.storybook/helpers'
import plugin from '../src'
import { MatchingExerciseRenderer } from '../src/renderer.component'
import { MatchingExerciseFeedback } from '../src/feedback.component'
import { MatchingExerciseSolution } from '../src/solution.component'
import { MatchingExerciseMobile } from '../src/mobile.component'
import {
  createEditableIdentifier,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import { create } from 'handlebars'

storiesOf('Matching Exercise/Renderer', module)
  .add('Funktion/Ableitung', () => {
    return (
      <MatchingExerciseRenderer
        state={{
          solution: [[0, 1], [1, 2]],
          //blockContent: ['2x + 2', '2', '0']
          blockContent: [
            createEditableIdentifier('2x+2'),
            createEditableIdentifier('2'),
            createEditableIdentifier('0')
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
            createEditableIdentifier('2x+2'),
            createEditableIdentifier('2'),
            createEditableIdentifier('0'),
            createEditableIdentifier('5x')
          ]
        }}
      />
    )
  })
  .add('Funktion/Ableitung Feedback', () => {
    return (
      <MatchingExerciseFeedback
        state={{
          solution: [[0, 1], [1, 2]],
          // blockContent: ['2x + 2', '2', '0','5x]
          blockContent: [
            createEditableIdentifier('2x+2'),
            createEditableIdentifier('2'),
            createEditableIdentifier('0'),
            createEditableIdentifier('5x')
          ]
        }}
      />
    )
  })
  .add('Funktion/Ableitung Lösung', () => {
    return (
      <MatchingExerciseSolution
        state={{
          solution: [[0, 1], [1, 2]],
          // blockContent: ['2x + 2', '2', '0','5x]
          blockContent: [
            createEditableIdentifier('2x+2'),
            createEditableIdentifier('2'),
            createEditableIdentifier('0'),
            createEditableIdentifier('5x')
          ]
        }}
      />
    )
  })
  .add('Funktion/Ableitung Mobil', () => {
    return (
      <MatchingExerciseMobile
        state={{
          solution: [[0, 1], [1, 2]],
          // blockContent: ['2x + 2', '2', '0','5x]
          blockContent: [
            createEditableIdentifier('2x+2'),
            createEditableIdentifier('2'),
            createEditableIdentifier('0'),
            createEditableIdentifier('5x')
          ]
        }}
      />
    )
  })
storiesOf('Matching Exercise', module).add('Editable (initial state)', () => {
  const content = createStateForContentPlugin({ plugin })

  return renderEditable(content)
})
