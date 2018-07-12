import React from 'react'
// import Editor, { Editable, createEmptyState } from 'ory-editor-core'
// import slate from 'ory-editor-plugins-slate'
// import highlight from '@serlo-org/ory-editor-plugins-highlight/src'
// import highlightRender from '@serlo-org/ory-editor-plugins-highlight/src/index.render'
// import Inner from 'ory-editor-core/lib/components/Editable/Inner'
// import DragDrop from 'ory-editor-core/lib/components/DragDropContext'
// import {Provider} from 'react-redux'
// import parallax from 'ory-editor-plugins-parallax-background'

// const defaultPlugin = slate()
// const editorPlugins= {
//     content: [slate()],
//     layout: [ parallax({defaultPlugin})]
//   }
// class Infobox extends React.Component{

//   constructor(props) {
//     super(props)
//     this.content = createEmptyState()
//     this.editor = new Editor({
//       plugins: editorPlugins,
//       defaultPlugin,
//       // pass the content state - you can add multiple editables here
//       editables: [this.content]
//     })
//     this.DragDropContext= DragDrop(window.editor.dragDropContext)
//   }

//   componentDidMount() {
//     this.editor.trigger.mode.layout()
//     this.editor.store.subscribe(() =>{
//       console.log(this.editor.store.getState())
//     })
//   }

//   render() {

//     console.log(Inner)
//     return <React.Fragment>
//       <Feedback isTrueAnswer> hello </Feedback>
//       <Provider store={this.editor.store}>
//       <this.DragDropContext>
//       <Inner defaultPlugin={this.editor.defaultPlugin} id={this.content.id} />
//       </this.DragDropContext>
//       </Provider>

//       <textarea/>
//       </React.Fragment>
//   }
// }
const Infobox = ({ children }) => (
  <div className="ory-editor-plugins-infobox">{children}</div>
)

export default Infobox
