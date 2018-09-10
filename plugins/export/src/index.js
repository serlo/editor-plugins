import pluginFactory from './plugins'
import blockquote from '@serlo-org/editor-plugin-blockquote'
import divider from '@splish-me/editor-plugin-divider'
import geogebra from '@serlo-org/editor-plugin-geogebra'
import hint from '@serlo-org/editor-plugin-hint'
import image from '@splish-me/editor-plugin-image'
import injection from '@serlo-org/editor-plugin-injection'
import license from '@serlo-org/editor-plugin-license'
import scMcExercise from '@serlo-org/editor-plugin-sc-mc-exercise'
import createSlate from '@splish-me/editor-plugin-slate'
import solution from '@serlo-org/editor-plugin-solution'
import spacer from '@splish-me/editor-plugin-spacer'
import spoiler from '@serlo-org/editor-plugin-spoiler'
import table from '@serlo-org/editor-plugin-table'
import textfield from '@serlo-org/editor-plugin-input-exercise'

const pluginMapping = {
  blockquote: blockquote,
  divider: divider,
  geogebra: geogebra,
  hint: hint,
  image: image,
  injection: injection,
  license: license,
  scMcExercise: scMcExercise,
  slate: createSlate(),
  solution: solution,
  spacer: spacer,
  spoiler: spoiler,
  table: table,
  textField: textfield,
}


export default (type) => pluginFactory(type, pluginMapping)

const defaultPlugin = pluginMapping.slate
export { defaultPlugin }
