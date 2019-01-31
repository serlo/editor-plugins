import * as React from 'react'
import {
  ContactCardRenderer,
  ContactCardRendererProps
} from '@serlo/editor-plugin-alphabet-sort-renderer'

export class ContactCard extends React.Component<ContactCardProps> {
  render() {
    const { contact } = this.props
    return <ContactCardRenderer onClick={this.editContact} contact={contact} />
  }

  private editContact = e => {
    e.preventDefault()
    this.props.changeEditIndex()
  }
}

export interface ContactCardProps extends ContactCardRendererProps {
  changeEditIndex: Function
}
