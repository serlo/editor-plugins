// import createImageRenderPlugin from '@serlo/editor-plugin-image/lib/index.render'
// import injection from '@serlo/editor-plugin-injection/lib/index.render'
// // TODO: create index.render
// import license from '@serlo/editor-plugin-license'
// import matchingExercise from '@serlo/editor-plugin-matching-exercise/lib/index.render'
// import scMcExercise from '@serlo/editor-plugin-sc-mc-exercise/lib/index.render'
// import solution from '@serlo/editor-plugin-solution/lib/index.render'
// // TODO: create index.render
// import spoiler from '@serlo/editor-plugin-spoiler'
// import table from '@serlo/editor-plugin-table/lib/index.render'
// import inputExercise from '@serlo/editor-plugin-input-exercise/lib/index.render'
// import stepByStep from '@serlo/editor-plugin-step-by-step/lib/index.render'
import { anchorRendererPlugin } from '@serlo/editor-plugin-anchor-renderer'
import { blockquoteRendererPlugin } from '@serlo/editor-plugin-blockquote-renderer'
import { equationsRendererPlugin } from '@serlo/editor-plugin-equations-renderer'
import { geogebraRendererPlugin } from '@serlo/editor-plugin-geogebra-renderer'
import { highlightRendererPlugin } from '@serlo/editor-plugin-highlight-renderer'
import { hintRendererPlugin } from '@serlo/editor-plugin-hint-renderer'
import { textRendererPlugin } from '@serlo/editor-plugin-text-renderer'
import { createPluginFactory, Plugin } from '@serlo/editor-plugins-registry'

export const createRendererPlugins = createPluginFactory({
  [Plugin.Anchor]: anchorRendererPlugin,
  [Plugin.Blockquote]: blockquoteRendererPlugin,
  [Plugin.Equations]: equationsRendererPlugin,
  [Plugin.Geogebra]: geogebraRendererPlugin,
  [Plugin.Highlight]: highlightRendererPlugin,
  [Plugin.Hint]: hintRendererPlugin,
  [Plugin.Text]: textRendererPlugin
})
