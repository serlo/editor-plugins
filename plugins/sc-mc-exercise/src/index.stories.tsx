import { storiesOf } from '@storybook/react'
import {
  createStateForContentPlugin,
  renderEditable,
  renderHTMLRenderer
} from '../../../.storybook/helpers'
import plugin from '.'

storiesOf('ScMc', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })

    return renderEditable(content)
  })
  .add('Renderer', () => {
    const state = JSON.parse(
      '{"id":"c9a55c35-6224-42fa-b81c-d62ac43a86c2","cells":[{"id":"edbb9227-bd2f-4bba-9f22-307efb3b8087","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/sc-mc-exercise","version":"0.0.4"},"state":{"type":"multiple","isSingleChoice":false,"answers":[{"id":{"type":"@splish-me/editor-core/editable","state":{"id":"1330ca32-6036-446f-9393-5b8d35840956","cells":[{"id":"6de73af9-f9d3-4341-b6e1-9a575cf113b3","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}},"isCorrect":false,"feedback":null}]}}}]}'
    )

    return renderHTMLRenderer(state)
  })
