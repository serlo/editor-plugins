import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { renderToString } from 'react-dom/server'

import 'font-awesome/css/font-awesome.css'
import 'katex/dist/katex.css'

import {
  renderEditable,
  renderHTMLRenderer
} from '@serlo-org/storybook-helpers'
import { content } from './content'

storiesOf('Example', module)
  .add('Editable', () => {
    return renderEditable(content)
  })
  .add('Renderer', () => {
    return renderHTMLRenderer(content)
  })
