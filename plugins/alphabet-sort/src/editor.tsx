import * as React from 'react'
import { ContactCard } from './contact-card.component'
import { styled } from '@serlo/editor-ui'
import * as R from 'ramda'
import {
  renderIntoSidebar,
  Input,
  Textarea,
  Dropdown,
  Button
} from '@splish-me/editor-ui-plugin-sidebar'
import { Upload } from '@serlo/editor-plugin-image'

const AddButtonContainer = styled.div({
  width: '200px ',
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
const SortContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%'
})
const uploadConfig = {
  url: 'https://serlo-upload.free.beeceptor.com',
  paramName: 'attachment[file]',
  maxFileSize: 2 * 1024 * 1024,
  allowedExtensions: ['gif', 'jpg', 'jpeg', 'png', 'svg'],
  getAdditionalFields: () => {
    return {
      type: 'file',
      csrf: ((window as unknown) as { csrf: string }).csrf
    }
  }
}
export class AlphabetSort extends React.Component<
  AlphabetSortProps,
  { editIndex: number; imagePreview: ImageLoaded }
> {
  public constructor(props: AlphabetSortProps) {
    super(props)
    this.state = {
      editIndex: null,
      imagePreview: undefined
    }
  }

  render() {
    const { state } = this.props
    const { contacts } = state
    return (
      <SortContainer>
        {contacts
          ? contacts.map((contact, index) => {
              return (
                <React.Fragment>
                  <ContactCard
                    contact={contact}
                    changeEditIndex={this.changeEditIndex(index)}
                  />
                  {index === this.state.editIndex
                    ? renderIntoSidebar(
                        <React.Fragment>
                          <Button onClick={this.removeContact(index)}>
                            Kontakt löschen
                          </Button>
                          <Input
                            label="Bilddatei"
                            type="text"
                            placeholder="http://example.com/image.png"
                            value={contacts[index].src}
                            onChange={event => {
                              this.handleSave(index)({
                                src: event.target.value
                              })
                            }}
                          />
                          <Upload
                            config={uploadConfig}
                            onImageUploaded={this.handleImageUploaded(index)}
                          />
                          <Input
                            type="text"
                            label="Vorname:"
                            value={contacts[index].firstName}
                            onChange={event => {
                              this.handleSave(index)({
                                firstName: event.target.value
                              })
                            }}
                          />
                          <Input
                            label="Nachname:"
                            type="text"
                            value={contacts[index].lastName}
                            onChange={event => {
                              this.handleSave(index)({
                                lastName: event.target.value
                              })
                            }}
                          />
                          <Textarea
                            label="Arbeitsbereiche:"
                            value={contacts[index].workingArea}
                            onChange={event => {
                              this.handleSave(index)({
                                workingArea: event.target.value
                              })
                            }}
                          />

                          <Dropdown
                            label=" Art der Kontaktinformation:"
                            value={contacts[index].typeOfContact}
                            onChange={event => {
                              this.handleSave(index)({
                                typeOfContact: event.target.value
                              })
                            }}
                            options={[
                              'Serlo Profil',
                              'Keine',
                              'LinkedIn',
                              'Github',
                              'Sonstige'
                            ]}
                          />

                          {contacts[index].typeOfContact === 'Sonstige' ? (
                            <Input
                              label="Kontaktart:"
                              type="text"
                              value={contacts[index].altTypeOfContact}
                              onChange={event => {
                                this.handleSave(index)({
                                  altTypeOfContact: event.target.value
                                })
                              }}
                            />
                          ) : null}
                          {contacts[index].typeOfContact === 'Keine' ? null : (
                            <Input
                              label="Link:"
                              type="text"
                              value={contacts[index].contactInfo}
                              onChange={event => {
                                event.preventDefault()
                                this.handleSave(index)({
                                  contactInfo: event.target.value
                                })
                              }}
                            />
                          )}
                        </React.Fragment>
                      )
                    : null}
                </React.Fragment>
              )
            })
          : null}
        <AddButtonContainer>
          <AddButton title="Add Teammember" onClick={this.addContact}>
            +
          </AddButton>
        </AddButtonContainer>
      </SortContainer>
    )
  }

  private handleSave = (index: number) => (
    partialChanges: Partial<ContactProps>
  ) => {
    const { onChange, state } = this.props
    const newContact = { ...state.contacts[index], partialChanges }
    // this.changeMode(index)(false)
    const updatedContacts = R.update(index, newContact, state.contacts)
    onChange({
      contacts: this.sortByFirstName(updatedContacts)
    })
  }
  private handleImageUploaded = (index: number) => ({ url }: ImageUploaded) => {
    this.setState({ imagePreview: undefined })
    this.handleSave(index)({ src: url })
  }
  private changeEditIndex = (index: number) => () => {
    this.setState({ editIndex: index })
  }
  // private changeMode = (index: number) => (newEditMode: boolean) => {
  //   const newEditModes = R.update(index, newEditMode, this.state.editModes)
  //   this.setState({
  //     editModes: newEditModes
  //   })
  // }

  private addContact = () => {
    const { onChange, state } = this.props
    const { contacts } = state
    this.setState({ editIndex: contacts.length })
    onChange({
      contacts: [...contacts, emptyContact]
    })
  }
  private removeContact = (index: number) => () => {
    const { state, onChange } = this.props
    this.setState({ editIndex: null })
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

export interface ImageUploaded {
  url: string
}
interface ImageLoaded {
  file: File
  dataUrl: string
}
