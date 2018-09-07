import pluginFactory from './plugins'
import createSlate from '@splish-me/editor-plugin-slate'
import image from '@splish-me/editor-plugin-image'
import divider from '@splish-me/editor-plugin-divider'
import spacer from '@splish-me/editor-plugin-spacer'
import spoiler from '@serlo-org/editor-plugin-spoiler'
import geogebra from '@serlo-org/editor-plugin-geogebra'
import license from '@serlo-org/editor-plugin-license'
import injection from '@serlo-org/editor-plugin-injection'
import scMcExercise from '@serlo-org/editor-plugin-sc-mc-exercise'
import textfield from '@serlo-org/editor-plugin-input-exercise'
import solution from '@serlo-org/editor-plugin-solution'
import hint from '@serlo-org/editor-plugin-hint'
import table from '@serlo-org/editor-plugin-table'


const pluginMapping = {
  slate: createSlate(),
  spacer: spacer,
  image: image,
  divider: divider,
  geogebra: geogebra,
  spoiler: spoiler,
  license: license,
  injection: injection,
  table: table,
  scMcExercise: scMcExercise,
  textField: textfield,
  solution: solution,
  hint: hint
}


export default (type) => pluginFactory(type, pluginMapping)

const defaultPlugin = pluginMapping.slate
export { defaultPlugin }
