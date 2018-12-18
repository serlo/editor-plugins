import { plugin } from './plugin'
import { GeoGebraRenderer } from './renderer.component'

export default {
  ...plugin,
  Component: GeoGebraRenderer
}
