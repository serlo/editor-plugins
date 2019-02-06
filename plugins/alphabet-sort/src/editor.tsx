import * as React from 'react'
import { styled } from '@serlo/editor-ui'
import * as R from 'ramda'
import {
  renderIntoSidebar,
  Input,
  Textarea,
  Dropdown,
  Button,
  ButtonGroup
} from '@splish-me/editor-ui'
import { Upload } from '@serlo/editor-plugin-image'
import { PluginEditorProps } from '@splish-me/editor'
import {
  AlphabetSortProps,
  ContactProps,
  SortContainer,
  ContactCardRenderer
} from '@serlo/editor-plugin-alphabet-sort-renderer'

const AddButton = styled.button({
  outline: 'none',
  width: '100%',
  border: 'none',
  marginBottom: '10px',
  backgroundColor: '#95bc1a'
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
  PluginEditorProps<AlphabetSortProps>,
  { editIndex?: number; imagePreview?: ImageLoaded }
> {
  public constructor(props) {
    super(props)
    this.state = {
      editIndex: undefined,
      imagePreview: undefined
    }
  }

  render() {
    const { state, preview } = this.props
    const readOnly = preview
    const { contacts } = state
    return (
      <div>
        <SortContainer>
          {contacts
            ? contacts.map((contact, index) => {
                return (
                  <React.Fragment>
                    <ContactCardRenderer
                      key={index}
                      onClick={this.changeEditIndex(index)}
                      contact={contact}
                      renderName={this.renderName(index)}
                      renderProfileImage={this.renderProfileImage(index)}
                    />
                    {index === this.state.editIndex && !readOnly
                      ? renderIntoSidebar(
                          <React.Fragment>
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
                              label="Name:"
                              value={contacts[index].name}
                              onChange={event => {
                                this.handleSave(index)({
                                  name: event.target.value
                                })
                              }}
                              onBlur={_event => this.sort()}
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
                            {contacts[index].typeOfContact ===
                            'Keine' ? null : (
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
                            <ButtonGroup>
                              <Button onClick={this.removeContact(index)}>
                                Kontakt löschen
                              </Button>
                            </ButtonGroup>
                          </React.Fragment>
                        )
                      : null}
                  </React.Fragment>
                )
              })
            : null}
        </SortContainer>
        {readOnly ? null : (
          <AddButton title="Add Teammember" onClick={this.addContact}>
            +
          </AddButton>
        )}
      </div>
    )
  }

  private handleSave = (index: number) => (
    partialChanges: Partial<ContactProps>
  ) => {
    const { onChange, state } = this.props
    const newContact = { ...state.contacts[index], ...partialChanges }
    const updatedContacts = R.update(index, newContact, state.contacts)
    onChange({
      contacts: updatedContacts
    })
  }
  private handleImageUploaded = (index: number) => ({ url }: ImageUploaded) => {
    this.setState({ imagePreview: undefined })
    this.handleSave(index)({ src: url })
  }
  private changeEditIndex = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    this.setState({ editIndex: index })
  }
  private renderName = (index: number) => () => {
    const { state } = this.props
    const name = state.contacts[index].name
    return name === '' ? (
      <strong> Click to edit </strong>
    ) : (
      <strong>{name}</strong>
    )
  }

  private renderProfileImage = (index: number) => () => {
    const { state } = this.props
    const src = state.contacts[index].src
    return src === '' ? 'https://placekitten.com/220/220' : src
  }
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
    console.log('sorting')
    const { onChange, state } = this.props
    const { contacts } = state
    onChange({
      contacts: this.sortByFirstName(contacts)
    })
  }
  private sortByFirstName = (contacts: ContactProps[]) => {
    const selected = contacts[this.state.editIndex]
    const sorted = R.sortBy(
      R.compose(
        R.toLower,
        R.prop('name')
      ),
      contacts
    )
    this.setState({
      editIndex: R.findIndex(R.equals(selected), sorted)
    })

    return sorted
  }
}

const emptyContact = {
  name: '',
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
