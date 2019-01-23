import * as React from 'react'
import { styled } from '@serlo/editor-ui'
import { ContactProps } from './editor'

const Card = styled.div({
  margin: '20px',
  padding: '0 15px',
  width: '150px',
  minHeight: '200px',
  // border: '1px solid #000',
  textAlign: 'center'
})

const Profilepicture = styled.img({
  width: '100%'
})
export class ContactCard extends React.Component<ContactCardProps> {
  render() {
    const { contact } = this.props
    return (
      <Card onClick={this.editContact}>
        <div>
          <Profilepicture
            src={
              contact.src === ''
                ? 'https://placekitten.com/220/220'
                : contact.src
            }
            alt={contact.firstName}
          />
        </div>
        <div>
          <strong>
            {contact.firstName === ''
              ? 'Bitte zum Editieren anklicken!'
              : contact.firstName + ' ' + contact.lastName}
          </strong>
        </div>
        <div>{contact.workingArea}</div>
        <div>
          <a href={contact.contactInfo}>
            {contact.typeOfContact === 'Sonstige'
              ? contact.altTypeOfContact
              : contact.typeOfContact}
          </a>
        </div>
      </Card>
    )
  }

  private editContact = e => {
    e.preventDefault()
    this.props.changeEditIndex()
  }
}

export interface ContactCardProps {
  contact: ContactProps
  changeEditIndex: Function
}
