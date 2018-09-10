import MarkdownTablePlugin from './Component'
import plugin from './plugin'

export default {
  ...plugin,
  Component: MarkdownTablePlugin,
  text: 'Table'
}
