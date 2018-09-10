import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import Textfield from '@splish-me/editor-ui/lib/sidebar-elements/textfield'
import React from 'react'

import Display from '../Display'

const handleChange = onChange => e => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    onChange({ src: target.value })
  }
}

const Form = props => (
  <div>
    <Display {...props} />
    {props.focused
      ? renderIntoSidebar(
          <Textfield
            label="Injection Element"
            placeholder="/12345"
            onChange={handleChange(props.onChange)}
            value={props.state.src}
          />
        )
      : null}
    {/* <BottomToolbar open={props.focused}>
      <TextField
        hintText='/12345'
        floatingLabelText='Injection Element'
        inputStyle={{ color: 'white' }}
        floatingLabelStyle={{ color: 'white' }}
        hintStyle={{ color: 'grey' }}
        style={{ width: '512px' }}
        value={props.state.src}
        onChange={handleChange(props.onChange)}
      />
    </BottomToolbar> */}
  </div>
)

export default Form
