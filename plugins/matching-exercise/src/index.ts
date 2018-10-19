// import Component from './Component'
// import { createEditableIdentifier } from
// '@splish-me/editor-core/lib/editable.component' import plugin from './plugin'

// export default {
//   ...plugin,
//   Component: Component,

//   text: 'Hidden Text',

//   createInitialState: () => ({
//     content: createEditableIdentifier(),
//     title: ''
//   })
// }
import { MatchingExerciseEditable } from './editable.component'
import { plugin } from './plugin'

export default {
  ...plugin,
  Component: MatchingExerciseEditable,

  text: 'Matching Exercise'
}
