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
import { anchorPlugin } from '@serlo-org/editor-plugin-anchor'
import { blockquotePlugin } from '@serlo-org/editor-plugin-blockquote'
import { equationsPlugin } from '@serlo-org/editor-plugin-equations'
import { geogebraPlugin } from '@serlo-org/editor-plugin-geogebra'
import { highlightPlugin } from '@serlo-org/editor-plugin-highlight'
import { hintPlugin } from '@serlo-org/editor-plugin-hint'
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
//   [Plugin.Image]: image,
//   [Plugin.Injection]: injection,
//   [Plugin.License]: license,
//   [Plugin.MatchingExercise]: matchingExercise,
//   [Plugin.ScMcExercise]: scMcExercise,
//   [Plugin.Solution]: solution,
//   [Plugin.Spoiler]: spoiler,
//   [Plugin.Table]: table,
//   [Plugin.InputExercise]: inputExercise,
//   [Plugin.StepByStep]: stepByStep,
// }

export const createEditorPlugins = createPluginFactory({
  [Plugin.Anchor]: anchorPlugin,
  [Plugin.Blockquote]: blockquotePlugin,
  [Plugin.Equations]: equationsPlugin,
  [Plugin.Geogebra]: geogebraPlugin,
  [Plugin.Highlight]: highlightPlugin,
  [Plugin.Hint]: hintPlugin,
  [Plugin.Text]: textPlugin
})
export const defaultPlugin = textPlugin
