import { css } from 'emotion'
import * as React from 'react'
import { Block as B } from './types'
import { MobileBlock as Block } from './mobile.block.component'
import posed from 'react-pose'
import Masonry from 'react-masonry-component'

export interface ColumnProps {
  blocks: B[]
  title?: string
  check?: boolean[]
  width?: string
  move?: (index: number) => (block: B) => void
  renderBlock: (block: React.ReactNode, index: number) => React.ReactNode
}

const AnimatedColumn = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
})

export class MobileColumn extends React.Component<ColumnProps> {
  static defaultProps: Pick<ColumnProps, 'renderBlock'> = {
    renderBlock: block => {
      return block
    }
  }
  public render() {
    const { blocks, title, renderBlock, check, width, move } = this.props

    return (
      <React.Fragment>
        <div
          className={css`
            background: white;
            width: ${width};
            margin: 10px;
            padding: 3px;
          `}
        >
          <strong>{title}</strong>
          <Masonry>
            {blocks.map((block, index) => {
              let feedback

              if (check) {
                feedback = check[index] ? 'Richtig' : 'Falsch'
              }

              return (
                <AnimatedColumn key={block.id}>
                  {renderBlock(
                    <Block
                      block={block}
                      move={move ? move(index) : undefined}
                    />,
                    index
                  )}
                  {feedback}
                </AnimatedColumn>
              )
            })}
          </Masonry>
        </div>
      </React.Fragment>
    )
  }
}
