import { HighlightEditor } from './editor.component'
import { plugin } from './plugin'

export default {
  ...plugin,
  Component: HighlightEditor,
  text: 'Code Highlight'
}
