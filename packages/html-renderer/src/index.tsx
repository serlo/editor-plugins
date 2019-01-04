import { createRenderer } from '@splish-me/editor-core-renderer'
import * as React from 'react'

const gridClass = (size = 12) => `col-sm-${size} col-xs-12`

export const HtmlRenderer = createRenderer({
  renderContainer({ children }) {
    return <div className="row">{children}</div>
  },
  renderRow({ children }) {
    return <div className="row">{children}</div>
  },
  renderCell({ cell, children }) {
    return <div className={gridClass(cell.size)}>{children}</div>
  }
})
