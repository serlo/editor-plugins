import { storiesOf } from '@storybook/react'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'

import { heMarkdownPlugin } from '@serlo/editor-plugin-he-markdown'

storiesOf('HE Markdown', module)
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin: heMarkdownPlugin,
      initialState: { 
        content: 'Markdown Hello!'
      }
    })
    return renderEditor(content)
  })
