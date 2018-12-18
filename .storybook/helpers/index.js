import * as React from 'react'
import uuid from 'uuid'

import { Renderer } from './Renderer'
import { SerloArticle } from './SerloArticle'

export { Renderer, SerloArticle }

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

export const renderEditable = state => {
  const r = new Renderer(state)

  return r.renderContainer(
    <SerloArticle controls={r.renderControls()}>
      {r.renderEditable()}
    </SerloArticle>
  )
}

export const renderHTMLRenderer = state => {
  const r = new Renderer(state)

  return <SerloArticle>{r.renderHTMLRenderer()}</SerloArticle>
}
