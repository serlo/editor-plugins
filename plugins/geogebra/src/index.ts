import { GeoGebraEditor } from './editor.component'
import { plugin } from './plugin'

export default {
  ...plugin,
  Component: GeoGebraEditor,
  text: 'GeoGebra'
}
