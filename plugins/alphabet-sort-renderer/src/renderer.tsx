import * as React from 'react'
import { ContactCardRenderer } from './contact-card.renderer'
import { PluginRendererProps } from '@splish-me/editor'

export class AlphabetSortRenderer extends React.Component<
  PluginRendererProps<AlphabetSortProps>
> {
  public render() {
    return (
      <React.Fragment>
        {this.props.state.contacts
          ? this.props.state.contacts.map((contact, index) => {
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
