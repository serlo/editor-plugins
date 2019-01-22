import { alphabetSortPlugin as plugin } from '@serlo/editor-plugin-alphabet-sort'
import {
  createStateForContentPlugin,
  renderEditor
} from '@serlo/storybook-helpers'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'
import { storiesOf } from '@storybook/react'

storiesOf('Alphabet Sort', module).add('Editable (initial state)', () => {
  const content = createStateForContentPlugin({ plugin })
  return renderEditor(content)
})
