import * as React from 'react'
import { ContactCardRenderer } from './contact-card.renderer'

export class AlphabetSortRenderer extends React.Component<AlphabetSortProps> {
  public render() {
    return (
      <React.Fragment>
        {this.props.contacts
          ? this.props.contacts.map((contact, index) => {
              return (
                <React.Fragment>
                  <ContactCardRenderer contact={contact} />
                </React.Fragment>
              )
            })
          : null}
      </React.Fragment>
    )
  }
}

export interface AlphabetSortProps {
  contacts?: ContactProps[]
}

export interface ContactProps {
  name?: string
  workingArea?: string
  typeOfContact?: string
  contactInfo?: string
  altTypeOfContact?: string
  src?: string
}
