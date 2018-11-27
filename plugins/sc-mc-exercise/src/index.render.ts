import { plugin } from './plugin'
import { ScMcRenderer } from './renderer.component'
import { ScMcRendererSolution } from './solution.component'
import { ScMcRendererTest } from './test.component'

export default {
  ...plugin,
  Component: ScMcRendererTest
}
