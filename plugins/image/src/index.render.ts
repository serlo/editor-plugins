import { plugin } from './plugin'
import { ImageRenderer } from './renderer.component'

export default () => ({
  ...plugin,
  Component: ImageRenderer
})
