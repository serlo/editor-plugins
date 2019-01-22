import * as React from 'react'
import { styled } from '@serlo/editor-ui'
import { ContactProps } from './editor'

const Card = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '20 px',
  width: '200px',
  border: '1px solid #000'
})

const Profilepicture = styled.img({
  marginLeft: '5%',
  marginRight: '5%',
  marginTop: '5%',
  width: '90%'
})
export class ContactCardRenderer extends React.Component<ContactProps> {
  render() {
    return (
      <Card>
        <div>
          <Profilepicture src={this.props.src} alt={this.props.firstName} />
        </div>
        <div>
          {this.props.firstName} {this.props.lastName}
        </div>
        <div>{this.props.workingArea}</div>
        <a href={this.props.contactInfo}>
          {this.props.typeOfContact === 'other'
            ? this.props.altTypeOfContact
            : this.props.typeOfContact}
        </a>
      </Card>
    )
  }
}
