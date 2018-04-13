import * as React from 'react'

import 'font-awesome/css/font-awesome.css'

// The editor core
import Editor, { Editable } from 'ory-editor-core'
import { HTMLRenderer } from 'ory-editor-renderer'

import 'ory-editor-core/lib/index.css' // we also want to load the stylesheets

// Require our ui components (optional). You can implement and use your own ui too!
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css'

// Load some exemplary plugins:
import slate from 'ory-editor-plugins-slate' // The rich text area plugin

import 'ory-editor-plugins-slate/lib/index.css' // Stylesheets for the rich text area plugin

import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'
import infobox from 'ory-editor-plugins-infobox'
import 'ory-editor-plugins-infobox/lib/index.css'
import highlight from 'ory-editor-plugins-highlight'
import 'ory-editor-plugins-highlight/lib/index.css'
import geogebra from 'ory-editor-plugins-geogebra'
import 'ory-editor-plugins-geogebra/lib/index.css'
import divider from 'ory-editor-plugins-divider'
import 'ory-editor-plugins-divider/lib/index.css'
import image from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'
import video from 'ory-editor-plugins-video'
import 'ory-editor-plugins-video/lib/index.css'

require('react-tap-event-plugin')() // react-tap-event-plugin is required by material-ui which is used by ory-editor-ui so we need to call it here

// Define which plugins we want to use. We only have slate and parallax available, so load those.
const plugins = {
  content: [slate(), spacer, image, video, divider, geogebra, highlight], // Define plugins for content cells
  layout: [infobox({ defaultPlugin: slate() })]
}

export class Renderer {
  constructor(content) {
    this.content = content
    this.editor = new Editor({
      plugins,
      // pass the content state - you can add multiple editables here
      editables: [content]
    })
  }

  renderEditable() {
    this.editor.trigger.mode.edit()

    return <Editable editor={this.editor} id={this.content.id} />
  }

  renderControls() {
    return (
      <div>
        <Trash editor={this.editor} />
        <DisplayModeToggle editor={this.editor} />
        <Toolbar editor={this.editor} />
      </div>
    )
  }

  renderHTMLRenderer() {
    return <HTMLRenderer state={this.content} plugins={plugins} />
  }
}
