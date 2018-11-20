import { css } from 'emotion'
import * as React from 'react'
import { Block as B } from './types'
import { MobileBlock as Block } from './mobile.block.component'
import { isCorrectPerRow } from './helpers'
import { MatchingExercisePluginState } from './editable.component'
import posed, { PoseGroup } from 'react-pose'
import * as R from 'ramda'

export interface ColumnProps {
  state: MatchingExercisePluginState
  blocks: [B | undefined, B | undefined][]
  title?: string
  undo?: (block: B) => void
  renderBlock: (block: React.ReactNode, index: number) => React.ReactNode
}
const AnimatedRow = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
})

export class MobileRow extends React.Component<ColumnProps> {
  static defaultProps: Pick<ColumnProps, 'renderBlock'> = {
    renderBlock: block => {
      return block
    }
  }
  public render() {
    const { blocks, title, renderBlock, state, undo } = this.props

    const last = R.last(blocks) || []
    const additionalRow =
      R.isEmpty(blocks) || (last[0] && last[1]) ? [[undefined, undefined]] : []

    return (
      <React.Fragment>
        <div
          className={css`
            margin: 10px;
          `}
        >
          <strong>{title}</strong>
          <PoseGroup>
            {[...blocks, ...additionalRow].map(
              ([leftBlock, rightBlock], index) => {
                let correct = false
                let wrong = false
                if (leftBlock && rightBlock) {
                  const test = isCorrectPerRow(state, [leftBlock, rightBlock])
                  correct = test
                  wrong = !test
                }
                return (
                  <AnimatedRow
                    key={index}
                    className={css`
                      display: flex;
                      background: white;
                      padding: 3px;
                      margin: 7px;
                      min-height: 40px;
                    `}
                  >
                    <div
                      className={css`
                        width: 50%;
                      `}
                    >
                      {leftBlock ? (
                        renderBlock(
                          <Block
                            block={leftBlock}
                            active
                            correct={correct}
                            wrong={wrong}
                            move={rightBlock ? undefined : undo}
                          />,
                          index
                        )
                      ) : (
                        <div
                          className={css`
                            border: 3px dashed #d9edf7;
                            height: calc(100% - 10px);
                            margin: 5px;
                          `}
                        />
                      )}
                    </div>
                    <div
                      className={css`
                        width: 50%;
                      `}
                    >
                      {rightBlock ? (
                        renderBlock(
                          <Block
                            block={rightBlock}
                            active
                            correct={correct}
                            wrong={wrong}
                          />,
                          index
                        )
                      ) : leftBlock ? (
                        <div
                          className={css`
                            border: 3px dashed #d9edf7;
                            height: calc(100% - 10px);
                            margin: 5px;
                          `}
                        />
                      ) : null}
                    </div>
                  </AnimatedRow>
                )
              }
            )}
          </PoseGroup>
        </div>
      </React.Fragment>
    )
  }
}
