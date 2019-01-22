import * as React from 'react'
import { styled } from '@serlo/editor-ui'
import { ContactProps } from './editor'
import { Upload } from '@serlo/editor-plugin-image'
import * as R from 'ramda'
import { ContactCardRenderer } from './contact-card-renderer.component'

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

const Box = styled.div({
  backgroundColor: 'lightgray',
  border: '1px solid #000',
  margin: '10px',
  padding: '10px'
})
const CollapsedBox = styled(Box)`
  cursor: pointer;
`
const DeleteButton = styled.button({
  float: 'right'
})
const SaveButon = styled.button({
  float: 'right',
  backgroundColor: '#718f14'
})
const CancelButton = styled.button({
  float: 'right',
  backgroundColor: '#d9534f'
})
export class ContactCard extends React.Component<
  ContactCardProps,
  ContactCardState
> {
  constructor(props: ContactCardProps) {
    super(props)
    this.state = { contact: props.contact, imagePreview: undefined }
  }

  render() {
    return this.props.readOnly ? (
      <ContactCardRenderer {...this.props.contact} />
    ) : this.props.editmode ? (
      <Box>
        <form
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <DeleteButton onClick={_e => this.props.removeContact()}>
            x
          </DeleteButton>
          <label>Bilddatei:</label>
          <input
            type="text"
            placeholder="http://example.com/image.png"
            value={this.state.contact.src}
            onChange={event => {
              this.setState({
                contact: { ...this.state.contact, src: event.target.value }
              })
            }}
          />
          <Upload
            config={uploadConfig}
            onImageUploaded={this.handleImageUploaded}
          />

          <div>
            <label>
              Vorname:
              <input
                type="text"
                value={this.state.contact.firstName}
                onChange={event => {
                  this.setState({
                    contact: {
                      ...this.state.contact,
                      firstName: event.target.value
                    }
                  })
                }}
              />
            </label>
            <label>
              Nachname:
              <input
                type="text"
                value={this.state.contact.lastName}
                onChange={event => {
                  this.setState({
                    contact: {
                      ...this.state.contact,
                      lastName: event.target.value
                    }
                  })
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Einsatzbereich:
              <textarea
                value={this.state.contact.workingArea}
                onChange={event => {
                  this.setState({
                    contact: {
                      ...this.state.contact,
                      workingArea: event.target.value
                    }
                  })
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Art der Kontaktinformation:
              <select
                id="contactsource"
                value={this.state.contact.typeOfContact}
                defaultValue="no"
                onChange={event => {
                  this.setState({
                    contact: {
                      ...this.state.contact,
                      typeOfContact: event.target.value
                    }
                  })
                }}
              >
                <option value="profile">Serlo Profil</option>
                <option value="no"> Keine </option>
                <option value="linkedIn">Linked In</option>
                <option value="github">GitHub</option>
                <option value="other"> Sonstiges</option>
              </select>
            </label>
          </div>
          {this.state.contact.typeOfContact === 'other' ? (
            <label>
              Kontaktart
              <input
                type="text"
                value={this.state.contact.altTypeOfContact}
                onChange={event => {
                  this.setState({
                    contact: {
                      ...this.state.contact,
                      altTypeOfContact: event.target.value
                    }
                  })
                }}
              />
            </label>
          ) : null}
          {this.state.contact.typeOfContact === 'no' ? null : (
            <label>
              Link
              <input
                type="text"
                value={this.state.contact.contactInfo}
                onChange={event => {
                  event.preventDefault()
                  this.setState({
                    contact: {
                      ...this.state.contact,
                      contactInfo: event.target.value
                    }
                  })
                }}
              />
            </label>
          )}
          <SaveButon onClick={this.save}>Save</SaveButon>
          <CancelButton onClick={this.cancel}>Cancel</CancelButton>
        </form>
      </Box>
    ) : (
      <CollapsedBox
        onClick={_e => {
          this.setState({ contact: this.props.contact })
          this.props.changeMode(true)
        }}
      >
        {this.props.contact.firstName
          ? this.props.contact.firstName + ' ' + this.props.contact.lastName
          : 'Zum editieren bitte Box anklicken'}
      </CollapsedBox>
    )
  }
  private save = () => {
    const newContactProps = this.state.contact
    this.props.onChange(newContactProps)
  }
  private cancel = () => {
    this.setState({ contact: this.props.contact })
  }
  private handleImageUploaded = ({ url }: ImageUploaded) => {
    this.setState({ imagePreview: undefined })
    this.props.onChange({ src: url })
  }
}

export interface ContactCardProps {
  contact: ContactProps
  onChange: Function
  changeMode: Function
  removeContact: Function
  editmode?: boolean
  readOnly: boolean
  sort: () => void
}

export interface ContactCardState {
  contact: ContactProps
  imagePreview: ImageLoaded
}
export interface ImageUploaded {
  url: string
}
interface ImageLoaded {
  file: File
  dataUrl: string
}
