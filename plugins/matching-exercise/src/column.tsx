import { Block as B } from '@serlo-org/editor-plugin-matching-exercise-renderer'
import { styled } from '@serlo-org/editor-ui'
import * as React from 'react'
// @ts-ignore
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { Block } from './block'

export class Column extends React.Component<ColumnProps> {
  static defaultProps: Pick<ColumnProps, 'renderBlock'> = {
    renderBlock: block => {
      return block
    }
  }
  public render() {
    const { id, blocks, title, children, renderBlock, check } = this.props

    return (
      <React.Fragment>
        <Droppable droppableId={id} direction="vertical">
          {(provided: any) => {
            return (
              <this.DroppableContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <strong>{title}</strong>
                {blocks.map((block, index) => {
                  let feedback

                  if (check) {
                    feedback = check[index] ? 'Richtig' : 'Falsch'
                  }

                  return (
                    <React.Fragment key={block.id}>
                      {renderBlock(
                        <Block block={block} index={index} />,
                        index
                      )}
                      {feedback}
                    </React.Fragment>
                  )
                })}
                {provided.placeholder}
                {children}
              </this.DroppableContainer>
            )
          }}
        </Droppable>
      </React.Fragment>
    )
  }

  private DroppableContainer = styled.div({
    background: 'red',
    width: '33.33%',
    margin: '10px'
  })
}

export interface ColumnProps {
  id: string
  blocks: B[]
  title?: string
  check?: boolean[]
  renderBlock: (block: React.ReactNode, index: number) => React.ReactNode
}
