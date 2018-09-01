import React from 'react'
import Display from '../Display'
import { renderIntoSidebar } from '@splish-me/editor-ui/src/plugin-sidebar.component'
import Textfield from '@splish-me/editor-ui/src/sidebar-elements/textfield'

import TextField from 'material-ui/TextField'
import { BottomToolbar } from 'ory-editor-ui'

const handleChange = onChange => e => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    onChange({ src: target.value })
  }
}

const Form = props => (
  <div>
    <Display {...props} />
    {/* <BottomToolbar open={props.focused}>
      <TextField
        hintText="12345"
        floatingLabelText="Geogebra Element"
        inputStyle={{ color: 'white' }}
        floatingLabelStyle={{ color: 'white' }}
        hintStyle={{ color: 'grey' }}
        style={{ width: '512px' }}
        value={props.state.src}
        onChange={handleChange(props.onChange)}
      />
    </BottomToolbar> */}
    {props.focused
      ? renderIntoSidebar(
          <Textfield
            label="Geogebra ID"
            placeholder="1221221"
            onChange={handleChange(props.onChange)}
            value={props.src}
          />
        )
      : null}
  </div>
)

export default Form
