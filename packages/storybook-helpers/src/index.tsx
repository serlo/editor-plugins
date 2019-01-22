import { createEditorPlugins } from '@serlo/editor-plugins'
import { Plugin } from '@serlo/editor-plugins-registry'
import { Plugin as P, StatefulPlugin } from '@splish-me/editor'
import * as React from 'react'
import * as uuid from 'uuid'

import { Renderer } from './renderer'
import { SerloContainer } from './serlo-container'

export { Renderer, SerloContainer }

const plugins = createEditorPlugins('all')

export const createStateForPlugin = ({
  plugin,
  initialState,
  kind
}: {
  plugin: Plugin
  kind: 'content'
  initialState: any
}) => {
  const p = plugins[plugin] as P<any>

  return {
    id: uuid.v4(),
    cells: [
      {
        id: uuid.v4(),
        [kind]: {
          plugin: {
            ...p,
            name: plugin,
            version: '999.0.0'
          },
          state:
            initialState ||
            ((p as StatefulPlugin<any>).createInitialState
              ? (p as StatefulPlugin<any>).createInitialState()
              : undefined)
        }
      }
    ]
  }
}

export const createStateForContentPlugin = props =>
  createStateForPlugin({ ...props, kind: 'content' })

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
