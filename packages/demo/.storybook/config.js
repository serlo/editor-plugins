import { configure } from '@storybook/react'

// const req = require.context('../../..', true, /__stories__\/.+\.tsx$/)

function loadStories() {
  // req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
