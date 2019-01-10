import { geogebraPlugin as plugin } from '@serlo/editor-plugin-geogebra'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { storiesOf } from '@storybook/react'

storiesOf('GeoGebra', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })

    return renderEditor(content)
  })
  .add('Editable (w/ state)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: { alt: 'Dreiecke konstruieren', src: '1571395' }
    })

    return renderEditor(content)
  })
  .add('Renderer', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: { alt: 'Dreiecke konstruieren', src: '1571395' }
    })

    return renderRenderer(content)
  })
