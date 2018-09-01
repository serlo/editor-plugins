import React from 'react'
import Display from '../Display'
import { renderIntoSidebar } from '@splish-me/editor-ui/src/plugin-sidebar.component'
import Textfield from '@splish-me/editor-ui/src/sidebar-elements/textfield'

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
