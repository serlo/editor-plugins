import { StepByStepPluginState } from '@serlo/editor-plugin-step-by-step-renderer'
import { createDocumentIdentifier } from '@splish-me/editor-core-document'

import { StepByStepEditor } from './editor'

export const stepByStepPlugin = {
  name: '@serlo-org/step-by-step',
  version: '0.0.0',
  Component: StepByStepEditor,
  text: 'Step by Step',

  createInitialState: (): StepByStepPluginState => {
    return {
      steps: [
        {
          type: 'step',
          content: createDocumentIdentifier(),
          explanation: createDocumentIdentifier()
        }
      ]
    }
  }
}
