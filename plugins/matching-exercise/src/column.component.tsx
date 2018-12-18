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
  check?: boolean[]
  renderBlock: (block: React.ReactNode, index: number) => React.ReactNode
}

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
              </div>
            )
          }}
        </Droppable>
      </React.Fragment>
    )
  }
}
