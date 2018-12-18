import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  createStateForContentPlugin,
  renderEditable,
  renderHTMLRenderer
} from '../../../.storybook/helpers'
import plugin from '../src'

storiesOf('Solution', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })

    return renderEditable(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        title: 'Foobar',
        content: createEditableIdentifier()
      }
    })

    return renderEditable(content)
  })
  .add('Renderer', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        title: 'Foobar',
        content: createEditableIdentifier()
      }
    })

    return renderHTMLRenderer(content)
  })
