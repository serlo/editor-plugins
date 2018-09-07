import * as React from 'react';
import { createRenderer } from '@splish-me/editor-core/renderer.component';

const gridClass = (size = 12) => `col-sm-${size} col-xs-12`;

export const HtmlRenderer = createRenderer({
  renderContainer({ children }) {
    return React.createElement(
      'div',
      { className: 'row' },
      children
    );
  },
  renderRow({ row, children }) {
    return React.createElement(
      'div',
      { key: row.id, className: 'row' },
      children
    );
  },
  renderCell({ cell, children }) {
    return React.createElement(
      'div',
      { key: cell.id, className: gridClass(cell.size) },
      children
    );
  }
});
//# sourceMappingURL=index.js.map