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
  .add('Test', () => {
    const state = JSON.parse(
      '{"id":"bcf20c5d-816e-47bb-ad7a-32bb3b97c47b","cells":[{"id":"eeaf3cab-493c-4440-a861-e848e2edd073","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/sc-mc-exercise","version":"0.0.4"},"state":{"type":"multiple","isSingleChoice":false,"answers":[{"id":{"type":"@splish-me/editor-core/editable","state":{"id":"dd658600-c1cf-48b7-b349-346414593554","cells":[{"id":"c5b97cbe-ff1d-419c-96d8-8d6ff6c29e42","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"dsaföjewaöojdsoifö","marks":[]}]}]}]}}}}}]}},"isCorrect":false,"feedback":null},{"id":{"type":"@splish-me/editor-core/editable","state":{"id":"8cecb0e6-71ba-490f-a4fb-408779af7d51","cells":[{"id":"3adc7859-6ea0-4f20-bb7a-e86d6e667ac0","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"dsfasfwae","marks":[]}]}]}]}}}}}]}},"isCorrect":false,"feedback":null},{"id":{"type":"@splish-me/editor-core/editable","state":{"id":"1f686d82-a362-49ab-808d-3bf9d468c706","cells":[{"id":"27df436f-a949-4af4-ad6d-0214f28171ff","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"dfewr1r3wef","marks":[]}]}]}]}}}}}]}},"isCorrect":false,"feedback":null}]}}}]}'
    )

    return renderHTMLRenderer(state)
  })
  .add('too long', () => {
    const state = JSON.parse(
      '{"id":"9d8c6cb3-cc73-4399-acef-c7e415951693","cells":[{"id":"4b2150c7-872c-40cf-be6a-cf3f9ca7cdfe","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/sc-mc-exercise","version":"0.0.4"},"state":{"type":"multiple","isSingleChoice":false,"answers":[{"id":{"type":"@splish-me/editor-core/editable","state":{"id":"48af791f-ca7a-4915-83c5-8adc3f4ac912","cells":[{"id":"3428c7e7-5fc2-4e45-ad53-3d564eed0fff","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]},{"object":"inline","type":"@splish-me/katex-inline","data":{"formula":"f(x)=9x+8","inline":true},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}},"isCorrect":true,"feedback":null},{"id":{"type":"@splish-me/editor-core/editable","state":{"id":"adc4a4c2-8966-434f-bc3d-40b87d545fa7","cells":[{"id":"b6f8d2aa-e5ed-43ba-9ca3-8aa395d5afad","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]},{"object":"inline","type":"@splish-me/katex-inline","data":{"formula":"f(x)=4+6","inline":true},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}},"isCorrect":true,"feedback":null}]}}}]}'
    )
    return renderHTMLRenderer(state)
  })
  .add('Test_Component', () => {
    const state = JSON.parse(
      '{"id":"64c984dd-3abc-4c8d-9d64-3757fc637b01","cells":[{"id":"5729fbc8-01eb-4fee-a098-65fb147aebbf","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/sc-mc-exercise","version":"0.0.4"},"state":{"type":"multiple","isSingleChoice":false,"answers":[{"id":{"type":"@splish-me/editor-core/editable","state":{"id":"4a09e2b3-fe63-498a-be86-9242771411cf","cells":[{"id":"2b91e334-8319-4428-b890-a997be04e0ef","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"1. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","marks":[]}]}]}]}}}}}]}},"isCorrect":true,"feedback":null},{"id":{"type":"@splish-me/editor-core/editable","state":{"id":"98e59323-02c6-42e3-ab64-e02ad6d75cfd","cells":[{"id":"b983aace-6ae3-4567-ab9c-3786dd08ffec","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"2. BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB","marks":[]}]}]}]}}}}}]}},"isCorrect":false,"feedback":null},{"id":{"type":"@splish-me/editor-core/editable","state":{"id":"3a603626-7c62-4ac1-8bc7-a0988d6a5f86","cells":[{"id":"8006cdf4-99f8-42b3-8b0b-102e633f060c","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"3. CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC","marks":[]}]}]}]}}}}}]}},"isCorrect":false,"feedback":null}]}}}]}'
    )
    return renderHTMLRenderer(state)
  })
