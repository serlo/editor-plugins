import React from 'react'
import { Editable } from '@splish-me/editor-core/src/editable.component'
import { renderIntoSidebar } from '@splish-me/editor-ui/src/plugin-sidebar.component'
import Dropdown from '@splish-me/editor-ui/src/sidebar-elements/dropdown'
import * as R from 'ramda'

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
export default class Infobox extends React.Component {
  handleLicenseChange = event => {
    const value = event.target.value
    const { onChange } = this.props
    onChange({
      license: this.translateLicenseName(value)
    })
  }
  translateLicenseName = name => {
    for (let i = 0; i < licenses.length; i++) {
      if (name === licenses[i].name) return licenses[i].type
    }
  }
  translateLicenseType = type => {
    for (let i = 0; i < licenses.length; i++) {
      if (type === licenses[i].type) return licenses[i].name
    }
  }
  render() {
    const { state, focused } = this.props
    return (
      <div>
        {focused
          ? renderIntoSidebar(
              <Dropdown
                label="Lizenztyp"
                options={R.map(license => license.name, licenses)}
                selectedValue={this.translateLicenseType(state.license)}
                onChange={this.handleLicenseChange}
              />
            )
          : null}
        {console.log(state.license)}
        <Editable id={state.content} />
      </div>
    )
  }
}
