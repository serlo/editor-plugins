import { Wiris } from '@serlo/editor-plugin-text-renderer'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

storiesOf('Wiris', module).add('Wiris', () => {
  return (
    <Wiris
      initialSrc="\sqrt{5}"
      onSave={action('save')}
      onCancel={action('cancel')}
    />
  )
})
