import { LicensePluginState } from '@serlo/editor-plugin-license-renderer'
import { createDocumentIdentifier, Plugin } from '@splish-me/editor'

import { LicenseEditor } from './editor'

export const licensePlugin: Plugin<LicensePluginState> = {
  text: 'Lizenzangabe',
  Component: LicenseEditor,
  createInitialState: (): LicensePluginState => ({
    license: 0,
    content: createDocumentIdentifier()
  })
}
