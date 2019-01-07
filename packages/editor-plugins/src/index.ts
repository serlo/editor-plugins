// import blockquote from '@serlo-org/editor-plugin-blockquote'
// import geogebra from '@serlo-org/editor-plugin-geogebra'
// import highlight from '@serlo-org/editor-plugin-highlight'
// import hint from '@serlo-org/editor-plugin-hint'
// import createImage from '@serlo-org/editor-plugin-image'
// import injection from '@serlo-org/editor-plugin-injection'
// import inputExercise from '@serlo-org/editor-plugin-input-exercise'
// import license from '@serlo-org/editor-plugin-license'
// import matchingExercise from '@serlo-org/editor-plugin-matching-exercise'
// import scMcExercise from '@serlo-org/editor-plugin-sc-mc-exercise/src'
// import solution from '@serlo-org/editor-plugin-solution'
// import spoiler from '@serlo-org/editor-plugin-spoiler'
// import table from '@serlo-org/editor-plugin-table'
// import stepByStep from '@serlo-org/editor-plugin-step-by-step'
// import equations from '@serlo-org/editor-plugin-equations'
import { anchorPlugin } from '@serlo-org/editor-plugin-anchor'
import { textPlugin } from '@serlo-org/editor-plugin-text'
import { createPluginFactory, Plugin } from '@serlo-org/editor-plugins-registry'

// const image = createImage({
//   upload: {
//     url: 'https://serlo-upload.free.beeceptor.com',
//     paramName: 'attachment[file]',
//     maxFileSize: 2 * 1024 * 1024,
//     allowedExtensions: ['gif', 'jpg', 'jpeg', 'png', 'svg'],
//     getAdditionalFields: () => {
//       return {
//         type: 'file',
//         csrf: ((window as unknown) as { csrf: string }).csrf
//       }
//     }
//   }
// })

// const pluginMapping: PluginRegistry = {
//   [Plugin.Blockquote]: blockquote,
//   [Plugin.GeoGebra]: geogebra,
//   [Plugin.Highlight]: highlight,
//   [Plugin.Hint]: hint,
//   [Plugin.Image]: image,
//   [Plugin.Injection]: injection,
//   [Plugin.License]: license,
//   [Plugin.MatchingExercise]: matchingExercise,
//   [Plugin.ScMcExercise]: scMcExercise,
//   [Plugin.Slate]: slatePlugin,
//   [Plugin.Solution]: solution,
//   [Plugin.Spoiler]: spoiler,
//   [Plugin.Table]: table,
//   [Plugin.InputExercise]: inputExercise,
//   [Plugin.StepByStep]: stepByStep,
//   [Plugin.Equations]: equations,
// }

export const createEditorPlugins = createPluginFactory({
  [Plugin.Anchor]: anchorPlugin,
  [Plugin.Text]: textPlugin
})
export const defaultPlugin = textPlugin
