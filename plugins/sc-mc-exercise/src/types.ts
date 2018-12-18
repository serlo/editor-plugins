import { EditableIdentifier } from '@splish-me/editor-core/lib/editable.component'

export interface Answer {
  isCorrect: boolean
  feedback: React.ReactNode
  id: EditableIdentifier
}
export interface ScMcPluginState {
  answers: Answer[]
  isSingleChoice: boolean
}
