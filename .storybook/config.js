import { setOptions } from '@storybook/addon-options'
import { configure } from '@storybook/react'

setOptions({
  name: 'ORY Editor Plugins',
  url: 'https://github.com/serlo-org/ory-editor-plugins',
  showStoriesPanel: true,
  showAddonPanel: false
})

const reqExample = require.context('../example', true, /\.stories\.(tsx?|js)$/)
const reqPlugins = require.context('../plugins', true, /\.stories\.(tsx?|js)$/)

const loadStories = () => {
  reqExample.keys().forEach(file => {
    if (file.indexOf('/lib/') === -1) {
      reqExample(file)
    }
  })

  reqPlugins.keys().forEach(file => {
    if (file.indexOf('/lib/') === -1) {
      reqPlugins(file)
    }
  })
}

configure(loadStories, module)
