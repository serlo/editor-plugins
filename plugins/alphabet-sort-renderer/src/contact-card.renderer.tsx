import * as React from 'react'
import { styled } from '@serlo/editor-ui'
import { ContactProps } from './renderer'
const Card = styled.div({
  padding: '0 15px 20px',
  width: '180px',
  minHeight: '200px',
  fontSize: '14px'
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
            src={this.props.renderProfileImage()}
            alt={contact.name}
          />
        </div>
        <div>{this.props.renderName()}</div>
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

export interface ContactCardProps {
  contact: ContactProps
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export interface ContactCardRendererProps extends ContactCardProps {
  renderName: () => React.ReactNode
  renderProfileImage: () => string
}
