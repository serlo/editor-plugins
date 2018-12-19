import dimensions from '@splish-me/ory-editor-core/lib/components/Dimensions'
import axios from 'axios'
import { debounce } from 'lodash'
import * as React from 'react'
import { v4 } from 'uuid'

import { GeoGebraPluginState } from './types'

const cache: { [src: string]: { width: number; height: number } } = {}

class InnerGeoGebraRenderer extends React.Component<
  GeoGebraRendererProps,
  GeoGebraRendererState
> {
  public state = {
    id: 'gtApplet' + v4(),
    width: 800,
    height: 500
  }

  public render(): React.ReactNode {
    const { containerWidth, state, readOnly } = this.props
    const { src } = state
    const { width, height } = this.state
    return (
      <div>
        {src ? (
          <iframe
            title={src}
            scrolling="no"
            src={'https://www.geogebra.org/material/iframe/id/' + src}
            width="100%"
            height={
              containerWidth ? (containerWidth * height) / width : undefined
            }
            style={{
              border: '0px',
              pointerEvents: readOnly ? 'auto' : 'none'
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              border: '2px lightgrey solid',
              borderRadius: '4px',
              padding: '10px'
            }}
          >
            <img
              src="https://cdn.geogebra.org/static/img/GeoGebra-logo.png"
              alt="Geogebra"
            />
          </div>
        )}
      </div>
    )
  }

  public componentDidMount(): void {
    this.mounted = true
    this.requestHeight(this.props.state.src)
  }

  public UNSAFE_componentWillReceiveProps(
    nextProps: Readonly<GeoGebraRendererProps>
  ): void {
    if (this.props.state.src !== nextProps.state.src) {
      this.requestHeight(nextProps.state.src)
    }
  }

  public componentWillUnmount(): void {
    this.mounted = false
  }

  private mounted = false

  private requestHeight = debounce((src?: string) => {
    if (!src) {
      return
    }

    if (cache[src]) {
      this.setState(cache[src])
      return
    }

    axios
      .post(
        'https://www.geogebra.org/api/json.php',
        {
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
        },
        // TODO: This is a (temporary?) workaround since GeoGebra Materials API doesn't handle preflight
        // requests correctly.
        {
          headers: {
            'Content-Type': 'text/plain'
          }
        }
      )
      .then(res => {
        if (this.mounted) {
          const { width, height } = res.data.responses.response.item
          const newState = { width: width, height: height }
          cache[src] = newState
          this.setState(newState)
        }
      })
  }, 500)
}

export const GeoGebraRenderer = dimensions()(InnerGeoGebraRenderer)

export interface GeoGebraRendererProps {
  state: GeoGebraPluginState
  readOnly?: boolean
  containerWidth?: number
}

export interface GeoGebraRendererState {
  id: string
  width: number
  height: number
}