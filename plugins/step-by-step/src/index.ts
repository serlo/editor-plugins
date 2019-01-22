import { StepByStepPluginState } from '@serlo/editor-plugin-step-by-step-renderer'
import { createDocumentIdentifier, Plugin } from '@splish-me/editor'

import { StepByStepEditor } from './editor'

export const stepByStepPlugin: Plugin<StepByStepPluginState> = {
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
