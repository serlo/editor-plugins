const { name, version } = require('../package.json')

export const plugin = {
  name: name.replace('editor-plugin-', ''),
  version
}