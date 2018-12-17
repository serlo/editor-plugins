import blockquote from '@serlo-org/editor-plugin-blockquote'
import divider from '@splish-me/editor-plugin-divider'
import geogebra from '@serlo-org/editor-plugin-geogebra'
import highlight from '@serlo-org/editor-plugin-highlight'
import hint from '@serlo-org/editor-plugin-hint'
import injection from '@serlo-org/editor-plugin-injection'
import license from '@serlo-org/editor-plugin-license'
import scMcExercise from '@serlo-org/editor-plugin-sc-mc-exercise'
import solution from '@serlo-org/editor-plugin-solution'
import spacer from '@splish-me/editor-plugin-spacer'
import spoiler from '@serlo-org/editor-plugin-spoiler'
import table from '@serlo-org/editor-plugin-table'
import textfield from '@serlo-org/editor-plugin-input-exercise'

import pluginFactory from './plugins'
import { slatePlugin } from './slate'

const pluginMapping = {
  blockquote: blockquote,
  divider: divider,
  geogebra: geogebra,
  highlight: highlight,
  hint: hint,
  // FIXME:
  // image: image,
  injection: injection,
  license: license,
  scMcExercise: scMcExercise,
  slate: slatePlugin,
  solution: solution,
  spacer: spacer,
  spoiler: spoiler,
  table: table,
  textfield: textfield
}

export default pluginFactory(pluginMapping)

const defaultPlugin = pluginMapping.slate
export { defaultPlugin }
