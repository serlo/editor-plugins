import blockquote from '@serlo-org/editor-plugin-blockquote/lib/index.render'
import geogebra from '@serlo-org/editor-plugin-geogebra/lib/index.render'
import highlight from '@serlo-org/editor-plugin-highlight/lib/index.render'
import hint from '@serlo-org/editor-plugin-hint/lib/index.render'
import createImageRender from '@serlo-org/editor-plugin-image/lib/index.render'
import injection from '@serlo-org/editor-plugin-injection'
import license from '@serlo-org/editor-plugin-license/lib/index.render'
import matchingExercise from '@serlo-org/editor-plugin-matching-exercise/lib/index.render'
import scMcExercise from '@serlo-org/editor-plugin-sc-mc-exercise/lib/index.render'
import solution from '@serlo-org/editor-plugin-solution/lib/index.render'
import divider from '@splish-me/editor-plugin-divider'
import spacer from '@splish-me/editor-plugin-spacer'
import spoiler from '@serlo-org/editor-plugin-spoiler/lib/index.render'
import table from '@serlo-org/editor-plugin-table/lib/index.render'
import textfield from '@serlo-org/editor-plugin-input-exercise/lib/index.render'
import stepByStep from '@serlo-org/editor-plugin-step-by-step/lib/index.render'
import equations from '@serlo-org/editor-plugin-equations/lib/index.render'

import pluginFactory from './plugins'
import { slateRenderPlugin } from './slate.render'

const pluginMapping = {
  blockquote: blockquote,
  divider: divider,
  geogebra: geogebra,
  highlight: highlight,
  hint: hint,
  image: createImageRender(),
  injection: injection,
  license: license,
  matchingExercise: matchingExercise,
  scMcExercise: scMcExercise,
  slate: slateRenderPlugin,
  solution: solution,
  spacer: spacer,
  spoiler: spoiler,
  table: table,
  textfield: textfield,
  stepByStep: stepByStep,
  equations: equations
}

export default pluginFactory(pluginMapping)
