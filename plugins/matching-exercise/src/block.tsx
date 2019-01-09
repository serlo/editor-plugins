import { Block as B } from '@serlo-org/editor-plugin-matching-exercise-renderer'
import { styled } from '@serlo-org/editor-ui'
import * as React from 'react'
// @ts-ignore
import { Draggable } from 'react-beautiful-dnd'

export class Block extends React.Component<BlockProps> {
  render() {
    const { block, index } = this.props
    return (
      <Draggable draggableId={block.id.toString()} index={index}>
        {(provided: any) => {
          return (
            <this.DraggableContainer
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {block.content}
            </this.DraggableContainer>
          )
        }}
      </Draggable>
    )
  }

  private DraggableContainer = styled.div({
    background: 'green',
    margin: '5px',
    padding: '5px',
    color: 'white',
    textAlign: 'center'
  })
}

export interface BlockProps {
  block: B
  index: number
}
