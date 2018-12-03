import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Equations } from './equations.component'
import {
  createStateForContentPlugin,
  renderEditable,
  renderHTMLRenderer
} from '../../../.storybook/helpers'
import plugin from '.'
import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'
storiesOf('Equations', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })
    return renderEditable(content)
  })
  .add('Editable mit content', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        steps: [
          {
            left: createEditableIdentifier(),
            right: createEditableIdentifier(),
            transform: createEditableIdentifier()
          },
          {
            left: createEditableIdentifier(),
            right: createEditableIdentifier(),
            transform: createEditableIdentifier()
          }
        ]
      }
    })
    return renderEditable(content)
  })
/*.add('Editable Umbruch', () => {
    const state = JSON.parse(
      '{"id":"4083f6de-5b7d-459d-92d1-a291d65fe0a6","cells":[{"id":"4f4780b6-6a61-4e93-907b-38f274461b71","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/step-by-step","version":"0.0.0"},"state":{"steps":[{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"115ff44b-96f6-4053-b43b-7d7f15071023","cells":[{"id":"c4352faf-e63d-453e-8060-0be16ebd0121","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"asdfasdklfaeöin","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"a181631f-1ae9-4b04-bd4b-b0a790adf120","cells":[{"id":"a9b6c5a2-8222-4b2e-951c-3a6542a47276","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"asdflkanöinasöivnaeifn ninawefin inawelinöiln inlianweilne linaeinaöifj nine","marks":[]}]}]}]}}}}}]}}},{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"e6c06e46-01c1-4a44-8b0f-f595e3fd9424","cells":[{"id":"3ac3d8ff-ae9b-4e83-a70c-5b2b64ff844f","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"asdf","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"ae443af3-1b1d-4d20-97b1-ace1e634bf1b","cells":[{"id":"6402d7cb-0d2f-4e14-bdd9-b914fa216e35","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"asdlkndsföina vivnöienöali fanöivnadöi adfivnaödih aröainöiadjij aöinaöliefLIJB LSENAÖIJÖ IANASDJAEN AJAlnaöin alinaöiröijailj gfigöiljrlina inröilna adsf","marks":[]}]}]}]}}}}}]}}},{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"83b815bc-e361-4626-acb2-231a9c57c697","cells":[{"id":"c60d6d2c-b8bb-415d-bd5a-7da8ab89f52a","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"asökdlsdlfkönaölei","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"72cdf8f1-816c-4afc-8695-13be6b1cd7be","cells":[{"id":"52a37bf7-789c-4590-9fac-d55e15ffd58e","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"lknqöeioj ölkasnöein flnöinöalij gnöalijaölij fföfia-lin ffeinaöln fienölinan lj","marks":[]}]}]}]}}}}}]}}}]}}}]}'
    )
    return renderHTMLRenderer(state)
  })*/
