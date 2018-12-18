import { createImageComponent } from './editable.component'
import { plugin } from './plugin'
import { Config } from './types'

export default (config: Config) => ({
  ...plugin,
  Component: createImageComponent(config),
  text: 'Bild',
  createInitialState: () => ({
    src: '',
    description: ''
  })
})
