import { css } from 'emotion'
import * as React from 'react'
// @ts-ignore
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Block as B } from './types'
import { MobileBlock as Block } from './mobile.block.component'

export interface ColumnProps {
  id: string
  blocks: B[]
  title?: string
  check?: boolean[]
  width?: string
  move?: (block: Block) => void
  renderBlock: (block: React.ReactNode, index: number) => React.ReactNode
}

export class MobileColumn extends React.Component<ColumnProps> {
  static defaultProps: Pick<ColumnProps, 'renderBlock'> = {
    renderBlock: block => {
      return block
    }
  }
  public render() {
    const {
      id,
      blocks,
      title,
      children,
      renderBlock,
      check,
      width,
      move
    } = this.props

    return (
      <React.Fragment>
        <div
          className={css`
            background: red;
            width: ${width};
            margin: 10px;
          `}
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
                  <Block block={block} index={index} move={move} />,
                  index
                )}
                {feedback}
              </React.Fragment>
            )
          })}
          {children}
        </div>
      </React.Fragment>
    )
  }
}
