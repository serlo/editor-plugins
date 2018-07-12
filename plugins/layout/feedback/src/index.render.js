import plugin from './plugin'
import Feedback from './Feedback'
export default ({ defaultPlugin }) => ({
  ...plugin,
  Component: Feedback
})
