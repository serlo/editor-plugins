import {
  LicensePluginState,
  LicenseRenderer
} from '@serlo/editor-plugin-license-renderer'
import {
  Dropdown,
  renderIntoSidebar
} from '@splish-me/editor-ui-plugin-sidebar'
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

export class LicenseEditor extends React.Component<LicenseEditorProps> {
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
        <LicenseRenderer state={state} />
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

export interface LicenseEditorProps {
  onChange: (state: Partial<LicensePluginState>) => void
  state: LicensePluginState
  focused?: boolean
}
