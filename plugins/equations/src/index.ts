import { EquationsEditable } from './editable.component'
import { plugin } from './plugin'

export default {
  ...plugin,
  Component: EquationsEditable,
  text: 'Gleichungssystem',
  createInitialState: () => ({})
}
