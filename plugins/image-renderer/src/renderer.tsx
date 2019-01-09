import * as React from 'react'
import styled from 'styled-components'

import { ImagePluginState } from '.'

const Img = styled.img({
  maxWidth: '100%'
})

export class ImageRenderer extends React.Component<ImageRendererProps> {
  render() {
    const { state, disableMouseEvents } = this.props
    const { src, description, href, target, rel } = state

    const image = <Img src={src} alt={description} />

    return (
      <div>
        {href && !disableMouseEvents ? (
          <a href={href} target={target} rel={rel}>
            {image}
          </a>
        ) : (
          image
        )}
      </div>
    )
  }
}

export interface ImageRendererProps {
  state: ImagePluginState
  disableMouseEvents?: boolean
}
