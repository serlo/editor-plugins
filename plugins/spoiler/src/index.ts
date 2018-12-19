import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

import { plugin } from './plugin'
import { Spoiler } from './spoiler.component'

export default {
  ...plugin,
  Component: Spoiler,
  text: 'Lösung',
  createInitialState: () => ({
    content: createEditableIdentifier(),
    title: ''
  })
}
