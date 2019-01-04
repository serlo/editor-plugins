import { createEditorPlugins, defaultPlugin } from '@serlo-org/editor-plugins'
import { createRendererPlugins } from '@serlo-org/editor-plugins-renderer'
import { HtmlRenderer } from '@serlo-org/html-renderer'
import {
  EditorContext,
  EditorUtilsContext
} from '@splish-me/editor-core-contexts'
import {
  Document,
  createDocumentIdentifier
} from '@splish-me/editor-core-document'
import { Editor } from '@splish-me/editor-core'
import { ModeToolbar } from '@splish-me/editor-ui-mode-toolbar'
import { AddSidebar } from '@splish-me/editor-ui-add-sidebar'
import { PluginSidebar } from '@splish-me/editor-ui-plugin-sidebar'
import { Sidebar } from '@splish-me/editor-ui-sidebar'
import * as React from 'react'

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
