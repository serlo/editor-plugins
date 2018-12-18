import { css } from 'emotion'
import React from 'react'
import Textarea from 'react-textarea-autosize'

export default ({ src, onChange, defaultSrc }) => (
  <form
    className={css({
      marginTop: '10px'
    })}
  >
    <div>
      <Textarea
        className={css({
          height: '50px',
          width: '100%',
          padding: '5px',
          fontFamily: 'Menlo, Monaco, "Courier New", monospace'
        })}
        value={src}
        placeholder={defaultSrc}
        name="markdown"
        onChange={onChange}
      >
        {src}
      </Textarea>
    </div>
  </form>
)
