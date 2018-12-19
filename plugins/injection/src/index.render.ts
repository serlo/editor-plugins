import { plugin } from './plugin'
import { InjectionRenderer } from './renderer.component'

export default {
  ...plugin,
  Component: InjectionRenderer
}
