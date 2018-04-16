import Infobox from './Infobox'
import plugin from './plugin'

export default ({ defaultPlugin }) => ({
  ...plugin,
  Component: Infobox
})
