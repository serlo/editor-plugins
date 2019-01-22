import { AlphabetSort } from './editor'

export const alphabetSortPlugin = {
  name: '@serlo-org/alphabetSort',
  version: '0.0.0',
  Component: AlphabetSort,
  text: 'Alphabet Sort',

  createInitialState: () => {
    return {
      contacts: []
    }
  }
}
