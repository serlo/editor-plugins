import * as React from 'react'
import { styled } from '@serlo/editor-ui'
import { ContactProps } from './renderer'
const Card = styled.div({
  padding: '0 15px 10px',
  width: '180px',
  minHeight: '200px',
  fontSize: '14px'
  // border: '1px solid #000',
})

const Profilepicture = styled.img({
  width: '100%',
  paddingBottom: '10px'
})
export class ContactCardRenderer extends React.Component<
  ContactCardRendererProps
> {
  render() {
    const { contact, onClick } = this.props
    return (
      <Card onClick={onClick}>
        <div>
          <Profilepicture
            src={
              contact.src === ''
                ? 'https://placekitten.com/220/220'
                : contact.src
            }
            alt={contact.name}
          />
        </div>
        <div>
          <strong>
            {contact.name === '' ? 'Bitte links editieren' : contact.name}
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
}

export interface ContactCardRendererProps {
  contact: ContactProps
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
