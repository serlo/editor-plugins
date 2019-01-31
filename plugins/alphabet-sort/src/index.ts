import { AlphabetSort } from './editor'

export const alphabetSortPlugin = {
  Component: AlphabetSort,
  text: 'Alphabet Sort',

  createInitialState: () => {
    return {
      contacts: []
    }
  }
}
