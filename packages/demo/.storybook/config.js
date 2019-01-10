import { setOptions } from '@storybook/addon-options'
import { configure } from '@storybook/react'

setOptions({
  name: 'Editor Plugins',
  url: 'https://github.com/serlo/editor-plugins',
  showStoriesPanel: true,
  showAddonPanel: false
})

const req = require.context('../__stories__', true, /\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
