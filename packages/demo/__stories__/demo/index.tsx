import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { renderToString } from 'react-dom/server'

import 'font-awesome/css/font-awesome.css'
import 'katex/dist/katex.css'

import { renderEditor, renderRenderer } from '@serlo/storybook-helpers'
import { content } from './content'

storiesOf('Example', module)
  .add('Editable', () => {
    return renderEditor(content)
  })
  .add('Renderer', () => {
    return renderRenderer(content)
  })
