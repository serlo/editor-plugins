import {
  Editable,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import Dropdown from '@splish-me/editor-ui/lib/sidebar-elements/dropdown'
import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import * as R from 'ramda'
import * as React from 'react'

const licenses = [
  {
    name: 'Typ 1',
    type: 0
  },
  {
    name: 'Typ 2',
    type: 1
  },
  {
    name: '...',
    type: 2
  }
]

export class License extends React.Component<LicenseProps> {
  render() {
    const { state, focused } = this.props
    return (
      <div>
        {focused
          ? renderIntoSidebar(
              <Dropdown
                label="Lizenztyp"
                options={R.map(license => license.name, licenses)}
                value={this.translateLicenseType(state.license || 0) || ''}
                onChange={this.handleLicenseChange}
              />
            )
          : null}
        {console.log(state.license)}
        <Editable id={state.content} />
      </div>
    )
  }

  private translateLicenseType = (type: number): string | null => {
    for (let i = 0; i < licenses.length; i++) {
      if (type === licenses[i].type) {
        return licenses[i].name
      }
    }

    return null
  }

  private handleLicenseChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const license = this.translateLicenseName(event.target.value)

    if (license) {
      this.props.onChange({
        license
      })
    }
  }

  private translateLicenseName = (name: string): number | null => {
    for (let i = 0; i < licenses.length; i++) {
      if (name === licenses[i].name) {
        return licenses[i].type
      }
    }

    return null
  }
}

export interface LicenseProps {
  onChange: (state: Partial<LicensePluginState>) => void
  state: LicensePluginState
  focused?: boolean
}

interface LicensePluginState {
  license: number
  content: EditableIdentifier
}
