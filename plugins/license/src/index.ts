import { LicensePluginState } from '@serlo-org/editor-plugin-license-renderer'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'

import { LicenseEditor } from './editor'

export default {
  name: '@serlo-org/license',
  version: '0.0.0',
  text: 'Lizenzangabe',
  Component: LicenseEditor,
  createInitialState: (): LicensePluginState => ({
    license: 0,
    content: createDocumentIdentifier()
  })
}
