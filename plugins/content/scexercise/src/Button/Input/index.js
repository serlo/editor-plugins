import React, { Component } from 'react'

export default class Input extends Component {
  render() {
    const { handleValueChange } = this.props

    return (
      <React.Fragment>
        <input
          className="checkboxstyle"
          type="checkbox"
          label="richtige Antwort"
          onChange={this.handleValueChange}
        />
        <Button className="button-default"> {this.props.children} </Button>
      </React.Fragment>
    )
  }
}
