import * as React from 'react'

import 'font-awesome/css/font-awesome.css'

// The editor core
import { EditorConsumer } from '@splish-me/editor-core/src/contexts'
import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor-core/src/editable.component'
import { Editor as E } from '@splish-me/editor-core/src/editor.component'
import { EditorHelpersConsumer } from '@splish-me/editor-core/src/contexts'
import { ModeToolbar } from '@splish-me/editor-ui/src/mode-toolbar.component'
import { Sidebar } from '@splish-me/editor-ui/src/sidebar.component'
import { AddSidebar } from '@splish-me/editor-ui/src/add-sidebar.component'
import { PluginSidebar } from '@splish-me/editor-ui/src/plugin-sidebar.component'
import { HtmlRenderer } from '@serlo-org/html-renderer'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

import '@splish-me/ory-editor-core/lib/index.css'

import editorPlugins from '@serlo-org/editor-plugins'
import renderPlugins from '@serlo-org/editor-plugins/lib/index.render'
require('react-tap-event-plugin')() // react-tap-event-plugin is required by material-ui which is used by ory-editor-ui so we need to call it here

export const editorPlugins = {
  content: [...defaultPlugins, ...exercisePlugins]
}

const renderPlugins = {
  content: [
    createSlate(),
    spacer,
    image,
    // video,
    divider,
    geogebraRender,
    highlightRender,
    scButtonRender,
    infoboxRender,
    textfieldRender,
    solutionRender,
    spoiler,
    tipp,
    injectionPlugin,
    lizenzRender
  ]
}

export const defaultPlugin = createSlate()

export class Renderer {
  constructor(content) {
    this.content = content
  }

  renderContainer(children) {
    return (
      <E defaultPlugin={defaultPlugin} plugins={editorPlugins.content}>
        <EditorConsumer>
          {({ currentMode }) => {
            return (
              <React.Fragment>
                <ModeToolbar />
                <Sidebar
                  active={currentMode !== 'preview'}
                  hideToggle={currentMode === 'layout'}
                >
                  {currentMode === 'layout' ? (
                    <AddSidebar />
                  ) : (
                    <PluginSidebar />
                  )}
                </Sidebar>
              </React.Fragment>
            )
          }}
        </EditorConsumer>
        {children}
      </E>
    )
  }

  renderEditable() {
    const rootId = createEditableIdentifier()
    return (
      <div>
        <Editable id={rootId} initialState={this.content} />
        <EditorHelpersConsumer>
          {({ undo, redo, serializeState }) => (
            <React.Fragment>
              <button
                onClick={() => {
                  undo()
                }}
              >
                Undo
              </button>
              <button
                onClick={() => {
                  redo()
                }}
              >
                Redo
              </button>
              <button
                onClick={() => {
                  console.log(
                    'state',
                    JSON.stringify({
                      state: JSON.stringify(serializeState(rootId))
                    })
                  )
                }}
              >
                Save
              </button>
            </React.Fragment>
          )}
        </EditorHelpersConsumer>
      </div>
    )
  }

  renderControls() {
    return null
  }

  renderHTMLRenderer() {
    return <HtmlRenderer state={this.content} plugins={renderPlugins.content} />
  }
}
