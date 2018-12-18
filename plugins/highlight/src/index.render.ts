import { plugin } from './plugin'
import { HighlightRenderer } from './renderer.component'

export default {
  ...plugin,
  Component: HighlightRenderer
}
