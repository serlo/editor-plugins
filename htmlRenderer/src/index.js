import * as React from 'react'
import { createRenderer } from '@splish-me/editor-core/lib/renderer.component'

const gridClass = (size = 12) => `col-sm-${size} col-xs-12`

export const HtmlRenderer = createRenderer({
  renderContainer({ children }) {
    return <div className="row">{children}</div>
  },
  renderRow({ row, children }) {
    return (
      <div key={row.id} className="row">
        {children}
      </div>
    )
  },
  renderCell({ cell, children }) {
    return (
      <div key={cell.id} className={gridClass(cell.size)}>
        {children}
      </div>
    )
  }
})
