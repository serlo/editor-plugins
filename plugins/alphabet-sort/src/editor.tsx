import * as React from 'react'
import { ContactCard } from './contact-card-editor.component'
import { styled } from '@serlo/editor-ui'
import * as R from 'ramda'

const AddButtonContainer = styled.div({
  textAlign: 'center'
})
const AddButton = styled.button({
  borderRadius: '50%',
  outline: 'none',
  width: '35px',
  height: '35px',
  border: 'none',
  margin: 'auto'
})

export class AlphabetSort extends React.Component<
  AlphabetSortProps,
  {
    editModes: boolean[]
  }
> {
  public constructor(props: AlphabetSortProps) {
    super(props)
    const editModes = R.map(contact => false, props.state.contacts)
    this.state = {
      editModes
    }
  }

  render() {
    const { state, readOnly } = this.props
    const { contacts } = state
    return (
      <React.Fragment>
        {contacts
          ? contacts.map((contact, index) => {
              return (
                <ContactCard
                  contact={contact}
                  changeMode={this.changeMode(index)}
                  onChange={this.handleSave(index)}
                  removeContact={this.removeContact(index)}
                  sort={this.sort}
                  readOnly={this.props.readOnly}
                  editmode={this.state.editModes[index]}
                />
              )
            })
          : null}
        <AddButtonContainer>
          <AddButton title="Add Teammember" onClick={this.addContact}>
            +
          </AddButton>
        </AddButtonContainer>
      </React.Fragment>
    )
  }

  private handleSave = (index: number) => (changes: ContactProps) => {
    const { onChange, state } = this.props
    this.changeMode(index)(false)
    const updatedContacts = R.update(index, changes, state.contacts)
    onChange({
      contacts: this.sortByFirstName(updatedContacts)
    })
  }

  private changeMode = (index: number) => (newEditMode: boolean) => {
    const newEditModes = R.update(index, newEditMode, this.state.editModes)
    this.setState({
      editModes: newEditModes
    })
  }

  private addContact = () => {
    const { onChange, state } = this.props
    const { contacts } = state
    this.setState({ editModes: [...this.state.editModes, true] })
    onChange({
      contacts: [...contacts, emptyContact]
    })
  }
  private removeContact = (index: number) => () => {
    const { state, onChange } = this.props
    this.setState({ editModes: R.remove(index, 1, this.state.editModes) })
    onChange({ contacts: R.remove(index, 1, state.contacts) })
  }

  private sort = () => {
    const { onChange, state } = this.props
    const { contacts } = state
    onChange({
      contacts: this.sortByFirstName(contacts)
    })
  }
  private sortByFirstName = R.sortBy(
    R.compose(
      R.toLower,
      R.prop('firstName')
    )
  )
}

export interface AlphabetSortProps {
  state: { contacts?: ContactProps[] }
  readOnly: boolean
  onChange: Function
}
export interface ContactProps {
  firstName?: string
  lastName?: string
  workingArea?: string
  typeOfContact?: string
  contactInfo?: string
  altTypeOfContact?: string
  src?: string
}

export const emptyContact = {
  firstName: '',
  lastName: '',
  workingArea: '',
  typeOfContact: '',
  contactInfo: '',
  altTypeOfContact: '',
  src: ''
}
