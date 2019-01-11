import { stepByStepPlugin } from '@serlo/editor-plugin-step-by-step'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { storiesOf } from '@storybook/react'

import { createDocumentIdentifier } from '@splish-me/editor-core-document'

storiesOf('Step by step', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin: stepByStepPlugin })

    return renderEditor(content)
  })

  .add('Editable mit content', () => {
    const content = createStateForContentPlugin({
      plugin: stepByStepPlugin,
      initialState: {
        steps: [
          { type: 'content', content: createDocumentIdentifier() },
          {
            type: 'step',
            content: createDocumentIdentifier(),
            explanation: createDocumentIdentifier()
          }
        ]
      }
    })

    return renderEditor(content)
  })

  .add('Editable Umbruch', () => {
    const state = JSON.parse(
      '{"id":"4083f6de-5b7d-459d-92d1-a291d65fe0a6","cells":[{"id":"4f4780b6-6a61-4e93-907b-38f274461b71","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/step-by-step","version":"0.0.0"},"state":{"steps":[{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"115ff44b-96f6-4053-b43b-7d7f15071023","cells":[{"id":"c4352faf-e63d-453e-8060-0be16ebd0121","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"asdfasdklfaeöin","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"a181631f-1ae9-4b04-bd4b-b0a790adf120","cells":[{"id":"a9b6c5a2-8222-4b2e-951c-3a6542a47276","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"asdflkanöinasöivnaeifn ninawefin inawelinöiln inlianweilne linaeinaöifj nine","marks":[]}]}]}]}}}}}]}}},{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"e6c06e46-01c1-4a44-8b0f-f595e3fd9424","cells":[{"id":"3ac3d8ff-ae9b-4e83-a70c-5b2b64ff844f","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"asdf","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"ae443af3-1b1d-4d20-97b1-ace1e634bf1b","cells":[{"id":"6402d7cb-0d2f-4e14-bdd9-b914fa216e35","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"asdlkndsföina vivnöienöali fanöivnadöi adfivnaödih aröainöiadjij aöinaöliefLIJB LSENAÖIJÖ IANASDJAEN AJAlnaöin alinaöiröijailj gfigöiljrlina inröilna adsf","marks":[]}]}]}]}}}}}]}}},{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"83b815bc-e361-4626-acb2-231a9c57c697","cells":[{"id":"c60d6d2c-b8bb-415d-bd5a-7da8ab89f52a","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"asökdlsdlfkönaölei","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"72cdf8f1-816c-4afc-8695-13be6b1cd7be","cells":[{"id":"52a37bf7-789c-4590-9fac-d55e15ffd58e","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"lknqöeioj ölkasnöein flnöinöalij gnöalijaölij fföfia-lin ffeinaöln fienölinan lj","marks":[]}]}]}]}}}}}]}}}]}}}]}'
    )
    return renderRenderer(state)
  })
  .add('Whatev', () => {
    const state = JSON.parse(
      '{"id":"ac7c4851-20ee-4825-bb2c-6e7822afb8db","cells":[{"id":"bb96e79e-21eb-43f7-b743-cab68bc0fc4c","inline":null,"size":12,"rows":[{"id":"2c1ba5e7-1373-4db6-8b47-174fadbad2e7","cells":[{"id":"12301c4d-b19f-4708-8487-35e0ef2752de","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/step-by-step","version":"0.0.0"},"state":{"steps":[{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"c647aed5-8973-4e09-9453-bb257e248c6b","cells":[{"id":"9943a50a-4ccc-4840-bb69-34c959e83073","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]},{"object":"inline","type":"@splish-me/katex-inline","data":{"formula":"\\\\frac{1}{2}","inline":true},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"7033d237-3c9c-4256-afa4-69bf5d2179f8","cells":[{"id":"7e9ba5bd-450a-4633-9762-5eba0db5d71d","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}}},{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"42d1cdf2-d5ab-4a51-917f-88061442c3ae","cells":[{"id":"ee0a817b-37fd-4ddd-bba8-7cb15956b3ed","inline":null,"size":12,"rows":[{"id":"995d4279-076b-44aa-a19c-8ffc17d96c6f","cells":[{"id":"f0231c34-7d24-49bf-a8b0-8f4d4b6ad228","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"2. Schritt aaaaaaaaaaaaaaa dasdasd asdasd asdas d ddasdasd ffdd ","marks":[]}]},{"object":"inline","type":"@splish-me/katex-inline","data":{"formula":"fdsfdsfsdfdf","inline":true},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]},{"id":"81e66358-cd0b-4214-900f-d7f34e8b9474","cells":[{"id":"8e619261-443b-416b-a7e1-1a1eda8a6551","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/spoiler","version":"0.0.4"},"state":{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"b9a962a5-6999-4dce-804e-670f212eba84","cells":[{"id":"5c158bb1-8d8b-4f39-9452-590ebf61fff3","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}},"title":""}}}]}]}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"d1f4895a-1b53-4bc0-ae12-1bc3658e46f7","cells":[{"id":"f1b507e2-2ffa-41ab-bc8d-9baca47d9183","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Erklärung für Schritt 2","marks":[]}]}]}]}}}}}]}}}]}}}]},{"id":"afcdd519-c58f-47cf-b775-695dd260216a","cells":[{"id":"48ebd3ce-d50a-4933-9091-803c0aa2f8bc","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/step-by-step","version":"0.0.0"},"state":{"steps":[{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"c06cd38c-ae34-4eb5-9955-44d671ba8835","cells":[{"id":"88935075-9866-429a-bd6f-2932ebf96c3e","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"84552ab7-93aa-4c4e-9e56-87696e4a5ac0","cells":[{"id":"9f24f6f7-091d-468c-98b4-ad9ded8caaa0","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}}}]}}}]}]}]}'
    )

    return renderRenderer(state)
  })
