import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  createStateForContentPlugin,
  renderEditable,
  renderHTMLRenderer
} from '../../../../.storybook/helpers'
import plugin from '.'

storiesOf('Highlight', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })

    return renderEditable(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        language: 'javascript',
        text: `console.log('hello world')`
      }
    })

    return renderEditable(content)
  })
  .add('Renderer (w/o line numbers)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        language: 'javascript',
        text: `console.log('hello world')`
      }
    })

    return renderHTMLRenderer(content)
  })
  .add('Renderer (w/ line numbers)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        language: 'javascript',
        text: `console.log('hello world')`,
        lineNumbers: true
      }
    })

    return renderHTMLRenderer(content)
  })
