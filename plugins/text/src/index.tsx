import { isCode, toggleCode } from '@splish-me/editor-plugin-text-plugin-code'
import {
  HeadingLevel,
  createIsHeading,
  createSetHeading
} from '@splish-me/editor-plugin-text-plugin-headings'
import {
  isLink,
  unwrapLink,
  wrapLink
} from '@splish-me/editor-plugin-text-plugin-link'
import {
  isUnorderedList,
  toggleUnorderedList,
  toggleOrderedList,
  isOrderedList
} from '@splish-me/editor-plugin-text-plugin-lists'
import { setParagraph } from '@splish-me/editor-plugin-text-plugin-paragraph'
import {
  isStrong,
  toggleStrong,
  isEmphasized,
  toggleEmphasize,
  isUnderlined,
  toggleUnderline
} from '@splish-me/editor-plugin-text-plugin-rich-text'
import { createUiPlugin } from '@splish-me/editor-plugin-text-plugin-ui'
import { createTextPlugin } from '@splish-me/editor-plugin-text'
import { ButtonGroup, Button } from '@splish-me/editor-ui-plugin-sidebar'
import {
  plugins as rendererPlugins,
  isKatex,
  insertKatex
} from '@serlo/editor-plugin-text-renderer'
import * as R from 'ramda'
import * as React from 'react'
import { Change, Value } from 'slate'

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
              applyChange(toggleUnorderedList)
            }}
          >
            ul
          </Button>
          <Button
            active={isOrderedList(value.change())}
            onClick={() => {
              applyChange(toggleOrderedList)
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
  ...rendererPlugins,
  createUiPlugin({
    Component
  })
]

export const textPlugin = {
  ...createTextPlugin({
    plugins
  }),
  name: '@splish-me/slate',
  version: '0.2.5'
}
