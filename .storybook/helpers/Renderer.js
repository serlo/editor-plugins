import * as React from 'react'

import 'font-awesome/css/font-awesome.css'

// The editor core
import { EditorConsumer } from '@splish-me/editor-core/src/contexts'
import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor-core/src/editable.component'
import { Editor as E } from '@splish-me/editor-core/src/editor.component'
import { ModeToolbar } from '@splish-me/editor-ui/src/mode-toolbar.component'
import { Sidebar } from '@splish-me/editor-ui/src/sidebar.component'
import { AddSidebar } from '@splish-me/editor-ui/src/add-sidebar.component'
import { PluginSidebar } from '@splish-me/editor-ui/src/plugin-sidebar.component'
import { HTMLRenderer } from 'ory-editor-renderer'

import 'ory-editor-core/lib/index.css' // we also want to load the stylesheets

import slate from 'ory-editor-plugins-slate'
import 'ory-editor-plugins-slate/lib/index.css'
// Zitat Jonas: brauchen wir nicht
// import video from 'ory-editor-plugins-video'
// import 'ory-editor-plugins-video/lib/index.css'

import image from '@serlo-org/ory-editor-plugins-image/src'
import '@serlo-org/ory-editor-plugins-image/src/index.css'
import divider from '@serlo-org/ory-editor-plugins-divider/src'
import '@serlo-org/ory-editor-plugins-divider/src/index.css'
import spacer from '@serlo-org/ory-editor-plugins-spacer/src'
import '@serlo-org/ory-editor-plugins-spacer/src/index.css'
import spoiler from '@serlo-org/ory-editor-plugins-spoiler/src'
import '@serlo-org/ory-editor-plugins-spoiler/src/index.css'
import infobox from '@serlo-org/ory-editor-plugins-infobox/src'
import infoboxRender from '@serlo-org/ory-editor-plugins-infobox/src/index.render'
import '@serlo-org/ory-editor-plugins-infobox/src/index.css'
import highlight from '@serlo-org/ory-editor-plugins-highlight/src'
import highlightRender from '@serlo-org/ory-editor-plugins-highlight/src/index.render'
import '@serlo-org/ory-editor-plugins-highlight/src/index.css'
import geogebra from '@serlo-org/ory-editor-plugins-geogebra/src'
import geogebraRender from '@serlo-org/ory-editor-plugins-geogebra/src/index.render'
import '@serlo-org/ory-editor-plugins-geogebra/src/index.css'
import textfield from '@serlo-org/ory-editor-plugins-textfield/src'
import textfieldRender from '@serlo-org/ory-editor-plugins-textfield/src/index.render'
import '@serlo-org/ory-editor-plugins-textfield/src/index.css'
import scButton from '@serlo-org/ory-editor-plugins-scexercise/src'
import scButtonRender from '@serlo-org/ory-editor-plugins-scexercise/src/index.render'
import '@serlo-org/ory-editor-plugins-scexercise/src/index.css'

// FIXME:
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

require('react-tap-event-plugin')() // react-tap-event-plugin is required by material-ui which is used by ory-editor-ui so we need to call it here

// Define which plugins we want to use. We only have slate and parallax available, so load those.
const editorPlugins = {
  content: [
    slate(),
    spacer,
    image,
    // video,
    divider,
    geogebra,
    highlight,
    scButton,
    infobox,
    spoiler,
    textfield
  ]
}

const renderPlugins = {
  content: [
    slate(),
    spacer,
    image,
    // video,
    divider,
    geogebraRender,
    highlightRender,
    scButtonRender,
    infoboxRender,
    textfieldRender
  ]
}

export class Renderer {
  constructor(content) {
    this.content = content
  }

  renderContainer(children) {
    return (
      <E defaultPlugin={slate()} plugins={editorPlugins.content}>
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
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                      <AddSidebar />
                    </MuiThemeProvider>
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
    return (
      <Editable id={createEditableIdentifier()} initialState={this.content} />
    )
  }

  renderControls() {
    return null
  }

  renderHTMLRenderer() {
    return <HTMLRenderer state={this.content} plugins={renderPlugins} />
  }
}
