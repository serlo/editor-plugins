// import hint from '@serlo-org/editor-plugin-hint/lib/index.render'
// import createImageRenderPlugin from '@serlo-org/editor-plugin-image/lib/index.render'
// import injection from '@serlo-org/editor-plugin-injection/lib/index.render'
// // TODO: create index.render
// import license from '@serlo-org/editor-plugin-license'
// import matchingExercise from '@serlo-org/editor-plugin-matching-exercise/lib/index.render'
// import scMcExercise from '@serlo-org/editor-plugin-sc-mc-exercise/lib/index.render'
// import solution from '@serlo-org/editor-plugin-solution/lib/index.render'
// // TODO: create index.render
// import spoiler from '@serlo-org/editor-plugin-spoiler'
// import table from '@serlo-org/editor-plugin-table/lib/index.render'
// import inputExercise from '@serlo-org/editor-plugin-input-exercise/lib/index.render'
// import stepByStep from '@serlo-org/editor-plugin-step-by-step/lib/index.render'
import { anchorRendererPlugin } from '@serlo-org/editor-plugin-anchor-renderer'
import { blockquoteRendererPlugin } from '@serlo-org/editor-plugin-blockquote-renderer'
import { equationsRendererPlugin } from '@serlo-org/editor-plugin-equations-renderer'
import { geogebraRendererPlugin } from '@serlo-org/editor-plugin-geogebra-renderer'
import { highlightRendererPlugin } from '@serlo-org/editor-plugin-highlight-renderer'
import { textRendererPlugin } from '@serlo-org/editor-plugin-text-renderer'
import { createPluginFactory, Plugin } from '@serlo-org/editor-plugins-registry'

export const createRendererPlugins = createPluginFactory({
  [Plugin.Anchor]: anchorRendererPlugin,
  [Plugin.Blockquote]: blockquoteRendererPlugin,
  [Plugin.Equations]: equationsRendererPlugin,
  [Plugin.Geogebra]: geogebraRendererPlugin,
  [Plugin.Highlight]: highlightRendererPlugin,
  [Plugin.Text]: textRendererPlugin
})
