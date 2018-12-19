import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { Wiris } from '../src/slate-plugin-katex/wiris.component.tsx'

storiesOf('Wiris', module).add('Wiris', () => {
  return (
    <Wiris
      initialSrc="\sqrt{5}"
      onSave={newSrc => {
        console.log(newSrc)
      }}
    />
  )
})
