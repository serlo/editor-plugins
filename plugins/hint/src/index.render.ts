import { plugin } from './plugin'
import { HintRenderer } from './renderer.component'

export default {
  ...plugin,
  Component: HintRenderer,
}
