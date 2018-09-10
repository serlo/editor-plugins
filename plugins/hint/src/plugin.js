import { name, version } from '../package.json'

export default {
  name: name.replace('editor-plugin-', ''),
  version
}
