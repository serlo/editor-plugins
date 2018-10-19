import * as React from 'react'

import 'font-awesome/css/font-awesome.css'

// The editor core
import { EditorConsumer } from '@splish-me/editor-core/lib/contexts'
import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import { Editor as E } from '@splish-me/editor-core/lib/editor.component'
import { EditorHelpersConsumer } from '@splish-me/editor-core/lib/contexts'
import { ModeToolbar } from '@splish-me/editor-ui/lib/mode-toolbar.component'
import { Sidebar } from '@splish-me/editor-ui/lib/sidebar.component'
import { AddSidebar } from '@splish-me/editor-ui/lib/add-sidebar.component'
import { PluginSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import { HtmlRenderer } from '@serlo-org/html-renderer'

import '@splish-me/ory-editor-core/src/index.css'
import 'katex/dist/katex.css'

import createEditorPlugins, { defaultPlugin } from '@serlo-org/editor-plugins'
import createRenderPlugins from '@serlo-org/editor-plugins/index.render'

const editorPlugins = createEditorPlugins('text-exercise')
const renderPlugins = createRenderPlugins('text-exercise')

export class Renderer {
  constructor(content) {
    this.content = content
  }

  renderContainer(children) {
    return (
      <E defaultPlugin={defaultPlugin} plugins={editorPlugins}>
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
    return <HtmlRenderer state={this.content} plugins={renderPlugins} />
  }
}
