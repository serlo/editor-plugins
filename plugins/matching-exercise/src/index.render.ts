// import spoiler from './Component'
import { plugin } from './plugin'
import { MatchingExerciseRenderer } from './renderer.component'

// export default {
//   ...plugin,
//   Component: spoiler
// }

export default { ...plugin, Component: MatchingExerciseRenderer }
