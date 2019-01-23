import { createEditorPlugins, defaultPlugin } from '@serlo/editor-plugins'
import { createRendererPlugins } from '@serlo/editor-plugins-renderer'
import { HtmlRenderer } from '@serlo/html-renderer'
import {
  createDocumentIdentifier,
  Document,
  Editor,
  EditorContext,
  EditorUtilsContext
} from '@splish-me/editor'
import {
  AddSidebar,
  ModeToolbar,
  PluginSidebar,
  Sidebar
} from '@splish-me/editor-ui'
import * as React from 'react'

import 'katex/dist/katex.css'
import 'ory-editor-core/lib/index.css'

const editorPlugins = createEditorPlugins('all')
const renderPlugins = createRendererPlugins('all')

export class Renderer {
  constructor(private content: unknown) {}

  renderContainer(children) {
    return (
      <Editor defaultPlugin={defaultPlugin} plugins={editorPlugins}>
        <EditorContext.Consumer>
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
        </EditorContext.Consumer>
        {children}
      </Editor>
    )
  }

  renderEditable() {
    const rootId = createDocumentIdentifier()

    return (
      <div>
        <Document state={rootId} initialState={this.content} />
        <EditorUtilsContext.Consumer>
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
        </EditorUtilsContext.Consumer>
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
