import { storiesOf } from '@storybook/react'
const example1 = require('./example_hello_world')
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'

import { heHeadingPlugin } from '@serlo/editor-plugin-he-heading'
import { heTitlePlugin } from '@serlo/editor-plugin-he-title'

storiesOf('Heading', module)
  .add('Editable (initial state)', () => { 
    const content = createStateForContentPlugin({
      plugin: heHeadingPlugin,
      initialState: { 
        caption: createStateForContentPlugin({
          plugin: heTitlePlugin,
          initialState: { content: "Static Hello!" } 
        }), 
        content: [] 
      }
    })
    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    return renderEditor(example1)
  })
