import { InjectionEditor, InjectionEditorProps } from './editor.component'
import { plugin } from './plugin'

export default {
  ...plugin,
  Component: InjectionEditor,
  text: 'Injection',
  createInitialState: (): InjectionEditorProps["state"] => {
    return {
      src: '',
      alt: ''
    }
  }
}
