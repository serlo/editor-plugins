import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { MatchingExerciseRenderer } from '../src/renderer.component'

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
