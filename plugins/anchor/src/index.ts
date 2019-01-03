import { plugin } from './plugin'
import { Anchor } from './editor.component'

export default {
  ...plugin,
  Component: Anchor,
  text: 'Anchor'
}
