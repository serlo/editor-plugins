import { h5pPlugin } from '@serlo/editor-plugin-h5p'
import {
  H5pPluginState,
  h5pRendererPlugin
} from '@serlo/editor-plugin-h5p-renderer'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { storiesOf } from '@storybook/react'

storiesOf('H5P', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin: h5pPlugin })

    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin: h5pPlugin,
      initialState: { src: '1290590769476175777' } as H5pPluginState
    })

    return renderEditor(content)
  })
  .add('Renderer', () => {
    const content = createStateForContentPlugin({
      plugin: h5pRendererPlugin,
      initialState: { src: '1290590769476175777' } as H5pPluginState
    })

    return renderRenderer(content)
  })
