import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { renderEditor, renderRenderer } from '@serlo/storybook-helpers'
import { content } from './content'

storiesOf('Example', module)
  .add('Editable', () => {
    return renderEditor(content)
  })
  .add('Renderer', () => {
    return renderRenderer(content)
  })
