import { Plugin } from '@serlo/editor-plugins-registry'
import {
  createStateForContentPlugin,
  renderEditor,
  renderRenderer
} from '@serlo/storybook-helpers'
import { createDocumentIdentifier } from '@splish-me/editor'
import { storiesOf } from '@storybook/react'

const plugin = Plugin.StepByStep

storiesOf('Step by step', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({ plugin })

    return renderEditor(content)
  })

  .add('Editable mit content', () => {
    const content = createStateForContentPlugin({
      plugin,
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
      '{"id":"90626726-d856-4b0f-ad43-449500314851","cells":[{"id":"569b90c8-2457-4487-a9a5-5b49635388ce","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/step-by-step","version":"999.0.0"},"state":{"steps":[{"type":"step","content":{"type":"@splish-me/editor-core/editable","state":{"id":"e1b70d22-6fb6-4393-936b-0c3286ec4f5d","cells":[{"id":"b643108a-9656-4f36-9c12-6d77d0439ab2","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"999.0.0"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"245a2577-a65d-483b-9595-8de20a5f52a4","cells":[{"id":"031dbfee-5622-49a7-a9bf-93914f641e33","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"999.0.0"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}}}]}}}]}'
    )
    return renderRenderer(state)
  })
  .add('Whatev', () => {
    const state = JSON.parse(
      '{"id":"ac7c4851-20ee-4825-bb2c-6e7822afb8db","cells":[{"id":"bb96e79e-21eb-43f7-b743-cab68bc0fc4c","inline":null,"size":12,"rows":[{"id":"2c1ba5e7-1373-4db6-8b47-174fadbad2e7","cells":[{"id":"12301c4d-b19f-4708-8487-35e0ef2752de","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/step-by-step","version":"0.0.0"},"state":{"steps":[{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"c647aed5-8973-4e09-9453-bb257e248c6b","cells":[{"id":"9943a50a-4ccc-4840-bb69-34c959e83073","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]},{"object":"inline","type":"@splish-me/katex-inline","data":{"formula":"\\\\frac{1}{2}","inline":true},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"7033d237-3c9c-4256-afa4-69bf5d2179f8","cells":[{"id":"7e9ba5bd-450a-4633-9762-5eba0db5d71d","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}}},{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"42d1cdf2-d5ab-4a51-917f-88061442c3ae","cells":[{"id":"ee0a817b-37fd-4ddd-bba8-7cb15956b3ed","inline":null,"size":12,"rows":[{"id":"995d4279-076b-44aa-a19c-8ffc17d96c6f","cells":[{"id":"f0231c34-7d24-49bf-a8b0-8f4d4b6ad228","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"2. Schritt aaaaaaaaaaaaaaa dasdasd asdasd asdas d ddasdasd ffdd ","marks":[]}]},{"object":"inline","type":"@splish-me/katex-inline","data":{"formula":"fdsfdsfsdfdf","inline":true},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]},{"id":"81e66358-cd0b-4214-900f-d7f34e8b9474","cells":[{"id":"8e619261-443b-416b-a7e1-1a1eda8a6551","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/spoiler","version":"0.0.4"},"state":{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"b9a962a5-6999-4dce-804e-670f212eba84","cells":[{"id":"5c158bb1-8d8b-4f39-9452-590ebf61fff3","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}},"title":""}}}]}]}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"d1f4895a-1b53-4bc0-ae12-1bc3658e46f7","cells":[{"id":"f1b507e2-2ffa-41ab-bc8d-9baca47d9183","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Erklärung für Schritt 2","marks":[]}]}]}]}}}}}]}}}]}}}]},{"id":"afcdd519-c58f-47cf-b775-695dd260216a","cells":[{"id":"48ebd3ce-d50a-4933-9091-803c0aa2f8bc","inline":null,"size":12,"content":{"plugin":{"name":"@serlo-org/step-by-step","version":"0.0.0"},"state":{"steps":[{"content":{"type":"@splish-me/editor-core/editable","state":{"id":"c06cd38c-ae34-4eb5-9955-44d671ba8835","cells":[{"id":"88935075-9866-429a-bd6f-2932ebf96c3e","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}},"explanation":{"type":"@splish-me/editor-core/editable","state":{"id":"84552ab7-93aa-4c4e-9e56-87696e4a5ac0","cells":[{"id":"9f24f6f7-091d-468c-98b4-ad9ded8caaa0","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}}}]}}}]}]}]}'
    )

    return renderRenderer(state)
  })
