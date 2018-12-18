import * as React from 'react'
// @ts-ignore
import { Draggable } from 'react-beautiful-dnd'
import { Block as B } from './types'
import { css } from 'emotion'

export interface BlockProps {
  block: B
  index: number
}

export class Block extends React.Component<BlockProps> {
  render() {
    const { block, index } = this.props
    return (
      <Draggable draggableId={block.id.toString()} index={index}>
        {(provided: any) => {
          return (
            <div
              className={css`
                background: green;
                margin: 5px;
                padding: 5px;
                color: white;
                text-align: center;
              `}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {block.content}
            </div>
          )
        }}
      </Draggable>
    )
  }
}
