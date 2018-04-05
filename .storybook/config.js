import { setOptions } from '@storybook/addon-options'
import { configure } from '@storybook/react'

setOptions({
  name: 'ORY Editor Plugins',
  url: 'https://github.com/serlo-org/ory-editor-plugins',
  showStoriesPanel: true,
  showAddonPanel: false
})

const reqExample = require.context('../example', true, /\.stories\.js$/)
const reqPlugins = require.context('../plugins', true, /\.stories\.js$/)

const loadStories = () => {
  reqExample.keys().forEach(filename => reqExample(filename))
  reqPlugins.keys().forEach(filename => reqPlugins(filename))
}

configure(loadStories, module)
