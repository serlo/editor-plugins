// import createImage from '@serlo/editor-plugin-image'
// import injection from '@serlo/editor-plugin-injection'
// import inputExercise from '@serlo/editor-plugin-input-exercise'
// import license from '@serlo/editor-plugin-license'
// import matchingExercise from '@serlo/editor-plugin-matching-exercise'
// import scMcExercise from '@serlo/editor-plugin-sc-mc-exercise/src'
// import solution from '@serlo/editor-plugin-solution'
// import spoiler from '@serlo/editor-plugin-spoiler'
// import table from '@serlo/editor-plugin-table'
// import stepByStep from '@serlo/editor-plugin-step-by-step'
import { anchorPlugin } from '@serlo/editor-plugin-anchor'
import { blockquotePlugin } from '@serlo/editor-plugin-blockquote'
import { equationsPlugin } from '@serlo/editor-plugin-equations'
import { geogebraPlugin } from '@serlo/editor-plugin-geogebra'
import { highlightPlugin } from '@serlo/editor-plugin-highlight'
import { hintPlugin } from '@serlo/editor-plugin-hint'
import { textPlugin } from '@serlo/editor-plugin-text'
import { createPluginFactory, Plugin } from '@serlo/editor-plugins-registry'

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
