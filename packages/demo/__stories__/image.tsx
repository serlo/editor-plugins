import { Plugin } from '@serlo/editor-plugins-registry'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { storiesOf } from '@storybook/react'

const plugin = Plugin.Image

storiesOf('Image', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })

    return renderEditor(content)
  })
  .add('Editable (image w/o href)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        src:
          'https://assets.serlo.org/legacy/58ec830878aec_a214fb916461e1a899c68bf3f8194c54fd85ca9e/dreiecke.png',
        description: 'Dreiecke in einem schönen Bild'
      }
    })
    return renderEditor(content)
  })
  .add('Editable (image with href)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        src:
          'https://assets.serlo.org/legacy/58ec830878aec_a214fb916461e1a899c68bf3f8194c54fd85ca9e/dreiecke.png',
        description: 'Dreiecke in einem schönen Bild',
        href: 'https://example.com',
        target: '_blank',
        rel: 'noreferrer noopener'
      }
    })
    return renderEditor(content)
  })
  .add('Renderer (image w/o href)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        src:
          'https://assets.serlo.org/legacy/58ec830878aec_a214fb916461e1a899c68bf3f8194c54fd85ca9e/dreiecke.png',
        description: 'Dreiecke in einem schönen Bild'
      }
    })
    return renderRenderer(content)
  })
  .add('Renderer (image w/ href and target)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        src:
          'https://assets.serlo.org/legacy/58ec830878aec_a214fb916461e1a899c68bf3f8194c54fd85ca9e/dreiecke.png',
        description: 'Dreiecke in einem schönen Bild',
        href: 'https://example.com',
        target: '_blank',
        rel: 'noreferrer noopener'
      }
    })
    return renderRenderer(content)
  })
  .add('Renderer (image w/ href w/o target)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        src:
          'https://assets.serlo.org/legacy/58ec830878aec_a214fb916461e1a899c68bf3f8194c54fd85ca9e/dreiecke.png',
        description: 'Dreiecke in einem schönen Bild',
        href: 'https://example.com',
        target: null,
        rel: null
      }
    })
    return renderRenderer(content)
  })
