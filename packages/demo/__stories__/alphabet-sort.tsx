import { alphabetSortPlugin as plugin } from '@serlo/editor-plugin-alphabet-sort'
import {
  createStateForContentPlugin,
  renderEditor
} from '@serlo/storybook-helpers'
import { storiesOf } from '@storybook/react'

storiesOf('Alphabet Sort', module)
  .add('Editable (initial state)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: { contacts: [] }
    })
    return renderEditor(content)
  })
  .add('Editable (4 Card Example)', () => {
    const content = createStateForContentPlugin({
      plugin,
      initialState: {
        contacts: [
          {
            name: 'Gang Kitty',
            workingArea:
              'being purring adorable. So adorable, that the text will need another line to be shown.',
            typeOfContact: 'Sonstige',
            contactInfo: 'https://placekitten.com/150/150',
            altTypeOfContact: 'PurrContact',
            src: 'https://placekitten.com/150/150'
          },
          {
            name: 'Baby Cat',
            workingArea: 'being purring awesome',
            typeOfContact: 'Serlo Profil',
            contactInfo: 'https://placekitten.com/g/150/150',
            altTypeOfContact: '',
            src: 'https://placekitten.com/g/150/150'
          },
          {
            name: 'Luring Kitty',
            workingArea: 'good at hiding',
            typeOfContact: 'LinkedIn',
            contactInfo: 'https://placekitten.com/g/160/160',
            altTypeOfContact: '',
            src: 'https://placekitten.com/g/160/160'
          },
          {
            name: 'Window Kitty',
            workingArea: 'professional windowscratcher',
            typeOfContact: 'Github',
            contactInfo: 'https://placekitten.com/160/160',
            altTypeOfContact: '',
            src: 'https://placekitten.com/160/160'
          }
        ]
      }
    })
    return renderEditor(content)
  })
