import dimensions from '@splish-me/ory-editor-core/lib/components/Dimensions'
import React, { Component } from 'react'
import { v4 } from 'uuid'
import request from 'superagent'
import debounce from 'lodash.debounce'

class Display extends Component {
  constructor(props) {
    super(props)
    this.requestHeight = debounce(this.requestHeight, 500)
  }

  state = {
    id: 'gtApplet' + v4(),
    width: 800,
    height: 500
  }

  componentDidMount() {
    this.mounted = true

    if (this.props.state.src) {
      this.requestHeight(this.props.state)
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  requestHeight = ({ src }) => {
    const geogebraRequest = JSON.stringify({
      request: {
        '-api': '1.0.0',
        task: {
          '-type': 'fetch',
          fields: {
            field: [{ '-name': 'width' }, { '-name': 'height' }]
          },
          filters: {
            field: [{ '-name': 'id', '#text': src }]
          },
          limit: { '-num': '1' }
        }
      }
    })

    request
      .post('http://www.geogebra.org/api/json.php')
      .send(geogebraRequest)
      .end((err, res) => {
        if (this.mounted && !err && res.ok) {
          const { width, height } = res.body.responses.response.item

          this.setState({
            width: width,
            height: height
          })
        }
      })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.state.src !== nextProps.state.src) {
      this.requestHeight(nextProps.state)
    }
  }

  render() {
    const { containerWidth } = this.props

    return (
      <div>
        <iframe
          title={this.props.state.src}
          scrolling="no"
          src={
            'https://www.geogebra.org/material/iframe/id/' +
            this.props.state.src
          }
          width="100%"
          height={
            containerWidth
              ? containerWidth * this.state.height / this.state.width
              : undefined
          }
          style={{
            border: '0px',
            pointerEvents: this.props.readOnly ? 'auto' : 'none'
          }}
        />
      </div>
    )
  }
}

export default dimensions()(Display)
