import { storiesOf } from '@storybook/react'
import {
  createStateForContentPlugin,
  renderEditable,
  renderHTMLRenderer
} from '../../../.storybook/helpers'
import createPlugin from '.'

const plugin = createPlugin({
  upload: {
    url: 'https://de.serlo.org/attachment/upload',
    maxFileSize: 2000000,
    allowedExtensions: ['gif', 'jpg', 'jpeg', 'png', 'svg']
  }
})
storiesOf('Image', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })

    return renderEditable(content)
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
    return renderEditable(content)
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
    return renderEditable(content)
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
    return renderHTMLRenderer(content)
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
    return renderHTMLRenderer(content)
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
    return renderHTMLRenderer(content)
  })
