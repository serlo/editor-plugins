"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HtmlRenderer = void 0;

var _renderer = require("@splish-me/editor-core/lib/renderer.component");

var React = _interopRequireWildcard(require("react"));

var gridClass = function gridClass() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
  return "col-sm-".concat(size, " col-xs-12");
};

var HtmlRenderer = (0, _renderer.createRenderer)({
  renderContainer: function renderContainer(_ref) {
    var children = _ref.children;
    return React.createElement("div", {
      className: "row"
    }, children);
  },
  renderRow: function renderRow(_ref2) {
    var row = _ref2.row,
        children = _ref2.children;
    return React.createElement("div", {
      key: row.id,
      className: "row"
    }, children);
  },
  renderCell: function renderCell(_ref3) {
    var cell = _ref3.cell,
        children = _ref3.children;
    return React.createElement("div", {
      key: cell.id,
      className: gridClass(cell.size)
    }, children);
  }
});
exports.HtmlRenderer = HtmlRenderer;
//# sourceMappingURL=index.js.map