import * as React from 'react'
// @ts-ignore
import { Draggable } from 'react-beautiful-dnd'
import { Block as B } from './types'
import { css } from 'emotion'

export interface BlockProps {
  block: B
  index: number
  move?: (block: B) => void
}

export class MobileBlock extends React.Component<BlockProps> {
  render() {
    const { block, index, move } = this.props
    return (
      <div
        className={css`
          background: green;
          margin: 5px;
          padding: 5px;
          color: white;
          text-align: center;
        `}
        onClick={() => {
          if (move) {
            move(block)
          }
        }}
      >
        {block.content}
      </div>
    )
  }
}
