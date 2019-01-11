import { anchorRendererPlugin } from '@serlo/editor-plugin-anchor-renderer'
import { blockquoteRendererPlugin } from '@serlo/editor-plugin-blockquote-renderer'
import { equationsRendererPlugin } from '@serlo/editor-plugin-equations-renderer'
import { geogebraRendererPlugin } from '@serlo/editor-plugin-geogebra-renderer'
import { highlightRendererPlugin } from '@serlo/editor-plugin-highlight-renderer'
import { hintRendererPlugin } from '@serlo/editor-plugin-hint-renderer'
import { createImageRendererPlugin } from '@serlo/editor-plugin-image-renderer'
import { injectionRendererPlugin } from '@serlo/editor-plugin-injection-renderer'
import { inputExercisePlugin } from '@serlo/editor-plugin-input-exercise'
import { licenseRendererPlugin } from '@serlo/editor-plugin-license-renderer'
import { matchingExerciseRendererPlugin } from '@serlo/editor-plugin-matching-exercise-renderer'
import { scMcExerciseRendererPlugin } from '@serlo/editor-plugin-sc-mc-exercise-renderer'
import { solutionRendererPlugin } from '@serlo/editor-plugin-solution-renderer'
import { spoilerRendererPlugin } from '@serlo/editor-plugin-spoiler-renderer'
import { stepByStepRendererPlugin } from '@serlo/editor-plugin-step-by-step-renderer'
import { tableRendererPlugin } from '@serlo/editor-plugin-table-renderer'
import { textRendererPlugin } from '@serlo/editor-plugin-text-renderer'
import { createPluginFactory, Plugin } from '@serlo/editor-plugins-registry'

const imageRendererPlugin = createImageRendererPlugin()

export const createRendererPlugins = createPluginFactory({
  [Plugin.Anchor]: anchorRendererPlugin,
  [Plugin.Blockquote]: blockquoteRendererPlugin,
  [Plugin.Equations]: equationsRendererPlugin,
  [Plugin.Geogebra]: geogebraRendererPlugin,
  [Plugin.Highlight]: highlightRendererPlugin,
  [Plugin.Hint]: hintRendererPlugin,
  [Plugin.Image]: imageRendererPlugin,
  [Plugin.Injection]: injectionRendererPlugin,
  [Plugin.InputExercise]: inputExercisePlugin,
  [Plugin.License]: licenseRendererPlugin,
  [Plugin.MatchingExercise]: matchingExerciseRendererPlugin,
  [Plugin.ScMcExercise]: scMcExerciseRendererPlugin,
  [Plugin.Solution]: solutionRendererPlugin,
  [Plugin.Spoiler]: spoilerRendererPlugin,
  [Plugin.StepByStep]: stepByStepRendererPlugin,
  [Plugin.Table]: tableRendererPlugin,
  [Plugin.Text]: textRendererPlugin
})
