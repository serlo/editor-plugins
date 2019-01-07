import * as React from 'react'
import * as uuid from 'uuid'

import { Renderer } from './renderer'
import { SerloContainer } from './serlo-container'

export { Renderer, SerloContainer }

export const createStateForPlugin = ({
  children,
  plugin,
  initialState,
  kind
}) => {
  return {
    id: uuid.v4(),
    cells: [
      {
        id: uuid.v4(),
        [kind]: {
          plugin,
          state:
            initialState ||
            (plugin.createInitialState
              ? plugin.createInitialState()
              : undefined)
        },
        rows:
          children ||
          (plugin.createInitialChildren
            ? plugin.createInitialChildren().rows
            : undefined)
      }
    ]
  }
}

export const createStateForContentPlugin = props =>
  createStateForPlugin({ ...props, kind: 'content' })
export const createStateForLayoutPlugin = props =>
  createStateForPlugin({ ...props, kind: 'layout' })

export const renderEditor = state => {
  const r = new Renderer(state)

  return r.renderContainer(
    <SerloContainer controls={r.renderControls()}>
      {r.renderEditable()}
    </SerloContainer>
  )
}

export const renderRenderer = state => {
  const r = new Renderer(state)

  return <SerloContainer>{r.renderHTMLRenderer()}</SerloContainer>
}
