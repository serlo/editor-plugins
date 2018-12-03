import blockquote from '@serlo-org/editor-plugin-blockquote/index.render'
import divider from '@splish-me/editor-plugin-divider'
import geogebra from '@serlo-org/editor-plugin-geogebra/index.render'
import hint from '@serlo-org/editor-plugin-hint/index.render'
import image from '@splish-me/editor-plugin-image'
import injection from '@serlo-org/editor-plugin-injection'
import license from '@serlo-org/editor-plugin-license/index.render'
import scMcExercise from '@serlo-org/editor-plugin-sc-mc-exercise/index.render'
import solution from '@serlo-org/editor-plugin-solution/index.render'
import spacer from '@splish-me/editor-plugin-spacer'
import spoiler from '@serlo-org/editor-plugin-spoiler/index.render'
import table from '@serlo-org/editor-plugin-table/index.render'
import textfield from '@serlo-org/editor-plugin-input-exercise/index.render'
import equations from '@serlo-org/editor-plugin-equations/index.render'

import pluginFactory from './plugins'
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
  textfield: textfield,
  equations: equations
}

export default pluginFactory(pluginMapping)
