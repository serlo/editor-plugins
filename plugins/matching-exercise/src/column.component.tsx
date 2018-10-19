import { css } from 'emotion'
import * as React from 'react'
// @ts-ignore
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Block as B } from './types'
import { Block } from './block.component'

export interface ColumnProps {
  id: string
  blocks: B[]
  title?: string
}

export class Column extends React.Component<ColumnProps> {
  public render() {
    const { id, blocks, title } = this.props

    return (
      <React.Fragment>
        <Droppable droppableId={id} direction="vertical">
          {(provided: any) => {
            return (
              <div
                className={css`
                  background: red;
                  width: 33.33%;
                  margin: 10px;
                `}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <strong>{title}</strong>
                {blocks.map((block, index) => {
                  return <Block key={block.id} block={block} index={index} />
                })}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </React.Fragment>
    )
  }
}
