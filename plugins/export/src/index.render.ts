import pluginFactory from './plugins'
import blockquote from '@serlo-org/editor-plugin-blockquote/lib/index.render.js'
import divider from '@splish-me/editor-plugin-divider'
import geogebra from '@serlo-org/editor-plugin-geogebra/lib/index.render.js'
import hint from '@serlo-org/editor-plugin-hint/lib/index.render.js'
import image from '@splish-me/editor-plugin-image'
import injection from '@serlo-org/editor-plugin-injection'
import license from '@serlo-org/editor-plugin-license/lib/index.render.js'
import scMcExercise from '@serlo-org/editor-plugin-sc-mc-exercise/lib/index.render.js'
import solution from '@serlo-org/editor-plugin-solution/lib/index.render.js'
import spacer from '@splish-me/editor-plugin-spacer'
import spoiler from '@serlo-org/editor-plugin-spoiler/lib/index.render.js'
import table from '@serlo-org/editor-plugin-table/lib/index.render.js'
import textfield from '@serlo-org/editor-plugin-input-exercise/lib/index.render.js'

import { slateRenderPlugin } from './slate.render'

const pluginMapping = {
  blockquote: blockquote,
  divider: divider,
  geogebra: geogebra,
  hint: hint,
  image: image,
  injection: injection,
  license: license,
  scMcExercise: scMcExercise,
  slate: slateRenderPlugin,
  solution: solution,
  spacer: spacer,
  spoiler: spoiler,
  table: table,
  textfield: textfield
}

export default pluginFactory(pluginMapping)
