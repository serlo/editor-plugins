import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'

import { LicenseRenderer } from './renderer'

export const licenseRendererPlugin: RendererPlugin<LicensePluginState> = {
  Component: LicenseRenderer
}

export interface LicensePluginState {
  license: number
  content: DocumentIdentifier
}

export * from './renderer'
