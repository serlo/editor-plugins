import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  createStateForContentPlugin,
  renderEditable,
  renderHTMLRenderer
} from '../../../.storybook/helpers'
import plugin from '../src'
import { MatchingExerciseRenderer } from '../src/renderer.component'
import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

storiesOf('Matching Exercise/Renderer', module)
  .add('Funktion/Ableitung', () => {
    return (
      <MatchingExerciseRenderer
        solution={[[0, 1], [1, 2]]}
        blockContent={['2x + 2', '2', '0']}
      />
    )
  })
  .add('Funktion/Ableitung (2)', () => {
    return (
      <MatchingExerciseRenderer
        solution={[[0, 1], [1, 2]]}
        blockContent={['2x + 2', '2', '0', '5x']}
      />
    )
  })
storiesOf('Matching Exercise', module).add('Editable (initial state)', () => {
  const content = createStateForContentPlugin({ plugin })

  return renderEditable(content)
})
