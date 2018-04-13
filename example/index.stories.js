import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { renderEditable, renderHTMLRenderer } from '../.storybook/helpers'
import { content } from './content'

storiesOf('Example', module)
  .add('Editable', () => renderEditable(content))
  .add('Renderer', () => renderHTMLRenderer(content))
