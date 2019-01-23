import {
  NodeRendererProps,
  NodeEditorProps,
  TextPlugin
} from '@splish-me/editor-plugin-text-plugin'
import {
  ButtonGroup,
  Button,
  Checkbox,
  Textarea,
  renderIntoSidebar
} from '@splish-me/editor-ui'
import { debounce } from 'lodash'
import * as React from 'react'
import { Block, Change, Inline, Schema, BlockJSON, InlineJSON } from 'slate'

import { Math } from './math.component'
import { Wiris } from './wiris.component'

export { Wiris }

export const katexBlockNode = '@splish-me/katex-block'
export const katexInlineNode = '@splish-me/katex-inline'

export interface KatexPluginOptions {
  EditorComponent?: React.ComponentType<NodeEditorProps>
  RenderComponent?: React.ComponentType<NodeRendererProps>
}

interface DefaultEditorComponentState {
  lastValue: string
  value: string
  showWiris: boolean
}

class DefaultEditorComponent extends React.Component<
  NodeEditorProps,
  DefaultEditorComponentState
> {
  public state: DefaultEditorComponentState = {
    lastValue: (this.props.node as Inline).data.get('formula'),
    value: (this.props.node as Inline).data.get('formula'),
    showWiris: false
  }

  static getDerivedStateFromProps(
    props: NodeEditorProps,
    state: DefaultEditorComponentState
  ): Partial<DefaultEditorComponentState> | null {
    const newValue = (props.node as Inline).data.get('formula')

    if (newValue === state.lastValue) {
      return null
    }

    return {
      lastValue: newValue,
      value: newValue
    }
  }

  private handleChange = debounce((formula: string) => {
    const { editor, node } = this.props
    const inline = node as Inline

    editor.change(change => {
      change
        .setNodeByKey(inline.key, {
          type: inline.type,
          data: {
            formula,
            inline: inline.data.get('inline')
          }
        })
        .focus()
    })

    setTimeout(() => {
      const input = this.input.current

      if (input) {
        input.focus()
      }
    })
  }, 500)

  private input = React.createRef<Textarea>() as React.RefObject<Textarea> &
    string

  public render() {
    const { attributes, node, isSelected } = this.props
    const { value } = this.state

    const { data } = node as Block | Inline
    const formula = data.get('formula')
    const inline = data.get('inline')

    return (
      <span {...attributes}>
        <Math formula={formula} inline={inline} />

        {isSelected
          ? renderIntoSidebar(
              <React.Fragment>
                <Textarea
                  ref={this.input}
                  label="Formula"
                  value={value}
                  onChange={e => {
                    const newValue = e.target.value

                    this.setState({ value: newValue })
                    this.handleChange(newValue)
                  }}
                  placeholder="\\frac{1}{2}"
                />
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      this.setState({ showWiris: true })
                    }}
                  >
                    Open Wiris
                  </Button>
                </ButtonGroup>
                <Checkbox
                  value={inline}
                  label="Inline"
                  onChange={e => {
                    const { editor } = this.props
                    const node = this.props.node as Block | Inline
                    const inline = e.target.checked
                    const data = { formula: value, inline }

                    editor.change(change => {
                      change.removeNodeByKey(node.key)

                      if (inline) {
                        change.insertInline({
                          type: katexInlineNode,
                          data
                        })
                      } else {
                        change.insertBlock({
                          type: katexBlockNode,
                          data
                        })
                      }
                    })
                  }}
                />
              </React.Fragment>
            )
          : null}
        {this.state.showWiris ? (
          <Wiris
            initialSrc={value}
            onSave={newValue => {
              this.setState({ value: newValue, showWiris: false })
              this.handleChange(newValue)
            }}
            onCancel={() => {
              this.setState({ showWiris: false })
            }}
          />
        ) : null}
      </span>
    )
  }
}

class DefaultRendererComponent extends React.Component<NodeRendererProps> {
  public render() {
    const { node } = this.props

    const { data } = node as BlockJSON | InlineJSON

    if (!data) {
      return null
    }

    const formula = data.formula as string
    const inline = data.inline as boolean

    return <Math formula={formula} inline={inline} />
  }
}

export const isKatex = (change: Change) => {
  return (
    change.value.blocks.some(block =>
      block ? block.type === katexBlockNode : false
    ) ||
    change.value.inlines.some(inline =>
      inline ? inline.type === katexInlineNode : false
    )
  )
}

export const insertKatex = (change: Change) => {
  return change.insertInline({
    type: katexInlineNode,
    data: {
      formula: '',
      inline: true
    }
  })
}

export const createKatexPlugin = ({
  EditorComponent = DefaultEditorComponent,
  RenderComponent = DefaultRendererComponent
}: KatexPluginOptions = {}): TextPlugin => {
  return {
    schema: Schema.fromJSON({
      inlines: {
        [katexInlineNode]: {
          isVoid: true
        }
      },
      blocks: {
        [katexBlockNode]: {
          isVoid: true
        }
      }
    }),

    deserialize(el) {
      switch (el.tagName.toLowerCase()) {
        case 'katexblock':
          return {
            object: 'block',
            type: katexBlockNode,
            data: {
              formula: el.childNodes[0].value,
              inline: false
            }
          }
        case 'katexinline':
          return {
            object: 'inline',
            type: katexInlineNode,
            data: {
              formula: el.childNodes[0].value,
              inline: true
            }
          }
        default:
          return undefined
      }
    },

    serialize(obj, children, key) {
      const block = obj as Block
      const inline = obj as Inline

      if (
        (block.object === 'block' && block.type === katexBlockNode) ||
        (inline.object === 'inline' && inline.type === katexInlineNode)
      ) {
        return (
          <RenderComponent key={key} node={obj}>
            {children}
          </RenderComponent>
        )
      }

      return undefined
    },

    renderNode(props) {
      const block = props.node as Block
      const inline = props.node as Inline

      if (
        (block.object === 'block' && block.type === katexBlockNode) ||
        (inline.object === 'inline' && inline.type === katexInlineNode)
      ) {
        return <EditorComponent {...props} />
      }

      return undefined
    }
  }
}
