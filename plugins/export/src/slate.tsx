import { defaultPlugins } from '@splish-me/editor-plugin-slate/lib/default-plugins'
import { defaultNode } from '@splish-me/editor-plugin-slate/lib/default-node'
import { createUiPlugin } from '@splish-me/editor-plugin-slate/lib/plugins/ui'
import { setParagraph } from '@splish-me/editor-plugin-slate/lib/plugins/paragraph'
import ButtonGroup, {
  Button
} from '@splish-me/editor-ui/lib/sidebar-elements/button'
import * as R from 'ramda'
import * as React from 'react'
import {
  HeadingLevel,
  createIsHeading,
  createSetHeading
} from '@splish-me/editor-plugin-slate/lib/plugins/headings'
import {
  isStrong,
  toggleStrong,
  isEmphasized,
  toggleEmphasize,
  isUnderlined,
  toggleUnderline
} from '@splish-me/editor-plugin-slate/lib/plugins/rich-text'
import {
  isLink,
  unwrapLink,
  wrapLink
} from '@splish-me/editor-plugin-slate/lib/plugins/link'

import {
  isCode,
  toggleCode
} from '@splish-me/editor-plugin-slate/lib/plugins/code'
import {
  isUnorderedList,
  createToggleUnorderedList,
  createToggleOrderedList,
  isOrderedList
} from '@splish-me/editor-plugin-slate/lib/plugins/lists'
import { Change, Value } from 'slate'
import { createSlatePlugin } from '@splish-me/editor-plugin-slate'

import { createKatexPlugin, isKatex, insertKatex } from './slate-plugin-katex'

class Component extends React.Component<{
  onChange: (change: Change) => void
  value: Value
}> {
  public render() {
    // FIXME: move to parent
    const { onChange, value } = this.props

    const applyChange = (f: (change: Change) => Change): void => {
      const change = value.change()
      onChange(f(change))
    }

    return (
      <React.Fragment>
        <ButtonGroup>
          <Button
            active={isStrong(value.change())}
            onClick={() => {
              applyChange(toggleStrong)
            }}
          >
            B
          </Button>
          <Button
            active={isEmphasized(value.change())}
            onClick={() => {
              applyChange(toggleEmphasize)
            }}
          >
            I
          </Button>
          <Button
            active={isUnderlined(value.change())}
            onClick={() => {
              applyChange(toggleUnderline)
            }}
          >
            U
          </Button>
          <Button
            active={isCode(value.change())}
            onClick={() => {
              applyChange(toggleCode)
            }}
          >
            Code
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          {R.times(index => {
            const level = (index + 1) as HeadingLevel
            const active = createIsHeading(level)(value.change())

            return (
              <Button
                key={index}
                active={active}
                onClick={() => {
                  applyChange(active ? setParagraph : createSetHeading(level))
                }}
              >
                H{level}
              </Button>
            )
          }, 6)}
        </ButtonGroup>
        <ButtonGroup>
          <Button
            active={isLink(value.change())}
            onClick={() => {
              const active = isLink(value.change())

              applyChange(active ? unwrapLink : wrapLink())
            }}
          >
            Link
          </Button>
          <Button
            active={isKatex(value.change())}
            onClick={() => {
              const active = isKatex(value.change())

              if (!active) {
                applyChange(insertKatex)
              }
            }}
          >
            Katex
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            active={isUnorderedList(value.change())}
            onClick={() => {
              applyChange(createToggleUnorderedList(defaultNode))
            }}
          >
            ul
          </Button>
          <Button
            active={isOrderedList(value.change())}
            onClick={() => {
              applyChange(createToggleOrderedList(defaultNode))
            }}
          >
            ol
          </Button>
        </ButtonGroup>
      </React.Fragment>
    )
  }
}

const plugins = [
  ...defaultPlugins,
  createKatexPlugin(),
  createUiPlugin({
    defaultNode,
    Component
  })
]

export const slatePlugin = createSlatePlugin({
  plugins,
  defaultNode
})
