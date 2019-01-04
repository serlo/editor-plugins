import { configure } from '@storybook/react'

// const req = require.context('../../..', true, /__stories__\/.+\.tsx$/)
const req = require.context('../__stories__', true, /\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
