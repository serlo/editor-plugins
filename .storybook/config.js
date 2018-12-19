import { setOptions } from '@storybook/addon-options'
import { configure } from '@storybook/react'

setOptions({
  name: 'ORY Editor Plugins',
  url: 'https://github.com/serlo-org/editor-plugins',
  showStoriesPanel: true,
  showAddonPanel: false
})

const reqExample = require.context('../example', true, /\.stories\.(tsx?|js)$/)
const reqPlugins = require.context(
  '../plugins',
  true,
  /(__stories__\/.*|\.stories)\.(tsx?|js)$/
)

const requireContext = req => {
  req.keys().forEach(file => {
    if (file.indexOf('/lib/') === -1) {
      req(file)
    }
  })
}

const loadStories = () => {
  requireContext(reqExample)
  requireContext(reqPlugins)
}

configure(loadStories, module)
