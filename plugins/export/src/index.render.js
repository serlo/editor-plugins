import pluginFactory from './plugins'

import createSlate from '@splish-me/editor-plugin-slate'
import image from '@splish-me/editor-plugin-image'
import divider from '@splish-me/editor-plugin-divider'
import spacer from '@splish-me/editor-plugin-spacer'
import spoiler from '@serlo-org/editor-plugin-spoiler/lib/index.render.js'
import geogebra from '@serlo-org/editor-plugin-geogebra/lib/index.render.js'
import license from '@serlo-org/editor-plugin-license/lib/index.render.js'
import injection from '@serlo-org/editor-plugin-injection'
import scMcExercise from '@serlo-org/editor-plugin-sc-mc-exercise/lib/index.render.js'
import textfield from '@serlo-org/editor-plugin-input-exercise/lib/index.render.js'
import solution from '@serlo-org/editor-plugin-solution/lib/index.render.js'
import hint from '@serlo-org/editor-plugin-hint/lib/index.render.js'
import table from '@serlo-org/editor-plugin-table/lib/index.render.js'

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

export default pluginFactory(pluginMapping)
