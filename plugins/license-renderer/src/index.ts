import { DocumentIdentifier } from '@splish-me/editor-core-types'

import { LicenseRenderer } from './renderer'

export const licenseRendererPlugin = {
  name: '@serlo-org/license',
  version: '0.0.0',
  Component: LicenseRenderer
}

export interface LicensePluginState {
  license: number
  content: DocumentIdentifier
}

export * from './renderer'
