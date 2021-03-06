import { Plugin } from '@serlo/editor-plugins-registry'
import { H5pPluginState } from '@serlo/editor-plugin-h5p-renderer'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { storiesOf } from '@storybook/react'

const plugin = Plugin.H5p
storiesOf('H5P', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })

    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: { src: '1290590769476175777' } as H5pPluginState
    })

    return renderEditor(content)
  })
  .add('Renderer', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: { src: '1290590769476175777' } as H5pPluginState
    })

    return renderRenderer(content)
  })
