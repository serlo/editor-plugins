// import geogebra from '@serlo-org/editor-plugin-geogebra/lib/index.render'
// import highlight from '@serlo-org/editor-plugin-highlight/lib/index.render'
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
// import equations from '@serlo-org/editor-plugin-equations/lib/index.render'
import { anchorRendererPlugin } from '@serlo-org/editor-plugin-anchor-renderer'
import { blockquoteRendererPlugin } from '@serlo-org/editor-plugin-blockquote-renderer'
import { createPluginFactory, Plugin } from '@serlo-org/editor-plugins-registry'
import { textRendererPlugin } from '@serlo-org/editor-plugin-text-renderer'

export const createRendererPlugins = createPluginFactory({
  [Plugin.Anchor]: anchorRendererPlugin,
  [Plugin.Blockquote]: blockquoteRendererPlugin,
  [Plugin.Text]: textRendererPlugin
})
