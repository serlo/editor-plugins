import React, { Component } from 'react'

export default class Display extends Component {
  render() {
    const { isSelected, isHovered, isTrue, checkMode } = this.props
    return (
      <React.Fragment>
        {checkMode ? (
          isTrue ? (
            <div className="button-true"> {this.props.children}</div>
          ) : (
            <div className="button-false"> {this.props.children}</div>
          )
        ) : isSelected ? (
          <div className="button-active">{this.props.children}</div>
        ) : isHovered ? (
          <div className="button-hover">{this.props.children} </div>
        ) : (
          <div className="button-default"> {this.props.children}</div>
        )}
      </React.Fragment>
    )
  }
}
