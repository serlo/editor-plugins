import blockquote from '@serlo-org/editor-plugin-blockquote'
import geogebra from '@serlo-org/editor-plugin-geogebra'
import highlight from '@serlo-org/editor-plugin-highlight'
import hint from '@serlo-org/editor-plugin-hint'
import createImage from '@serlo-org/editor-plugin-image'
import injection from '@serlo-org/editor-plugin-injection'
import textfield from '@serlo-org/editor-plugin-input-exercise'
import license from '@serlo-org/editor-plugin-license'
import matchingExercise from '@serlo-org/editor-plugin-matching-exercise'
import scMcExercise from '@serlo-org/editor-plugin-sc-mc-exercise/src'
import solution from '@serlo-org/editor-plugin-solution'
import spoiler from '@serlo-org/editor-plugin-spoiler'
import table from '@serlo-org/editor-plugin-table'
import stepByStep from '@serlo-org/editor-plugin-step-by-step'
import equations from '@serlo-org/editor-plugin-equations'
import anchor from '@serlo-org/editor-plugin-anchor'
import pluginFactory from './plugins'
import { slatePlugin } from './slate'

const image = createImage({
  upload: {
    url: 'https://serlo-upload.free.beeceptor.com',
    paramName: 'attachment[file]',
    maxFileSize: 2 * 1024 * 1024,
    allowedExtensions: ['gif', 'jpg', 'jpeg', 'png', 'svg'],
    getAdditionalFields: () => {
      return {
        type: 'file',
        csrf: ((window as unknown) as { csrf: string }).csrf
      }
    }
  }
})

const pluginMapping = {
  blockquote: blockquote,
  geogebra: geogebra,
  highlight: highlight,
  hint: hint,
  image: image,
  injection: injection,
  license: license,
  matchingExercise: matchingExercise,
  scMcExercise: scMcExercise,
  slate: slatePlugin,
  solution: solution,
  spoiler: spoiler,
  table: table,
  textfield: textfield,
  stepByStep: stepByStep,
  equations: equations,
  anchor: anchor
}

export default pluginFactory(pluginMapping)

export const defaultPlugin = pluginMapping.slate
