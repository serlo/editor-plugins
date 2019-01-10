import { styled } from '@serlo/editor-ui'
import * as React from 'react'
import posed, { PoseGroup } from 'react-pose'
import * as R from 'ramda'

import { Block } from './block'
import { isCorrectPerRow } from './helpers'
import { Block as B, MatchingExercisePluginState } from '.'

export class Row extends React.Component<ColumnProps> {
  static defaultProps: Pick<ColumnProps, 'renderBlock'> = {
    renderBlock: block => {
      return block
    }
  }
  public render() {
    const { blocks, title, renderBlock, state, undo } = this.props

    const rows = [...blocks]
    const last = R.last(blocks)
    const lastRowComplete = Boolean(!last || (last[0] && last[1]))

    if (lastRowComplete) {
      rows.push([undefined, undefined])
    }

    return (
      <this.Container>
        <strong>{title}</strong>
        <PoseGroup>
          {rows.map(([leftBlock, rightBlock], index) => {
            let correct = false
            let wrong = false
            if (leftBlock && rightBlock) {
              const test = isCorrectPerRow(state, [leftBlock, rightBlock])
              correct = test
              wrong = !test
            }
            return (
              <this.AnimatedRow key={index}>
                <this.Column>
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
                    <this.BlockPlaceholder />
                  )}
                </this.Column>
                <this.Column>
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
                    <this.BlockPlaceholder />
                  ) : null}
                </this.Column>
              </this.AnimatedRow>
            )
          })}
        </PoseGroup>
      </this.Container>
    )
  }

  private Container = styled.div({ margin: '10px' })

  private AnimatedRow = styled(
    posed.div({
      enter: { opacity: 1 },
      exit: { opacity: 0 }
    })
  )({
    display: 'flex',
    background: 'white',
    padding: '3px',
    margin: '7px',
    minHeight: '40px'
  })

  private Column = styled.div({
    width: '50%'
  })

  private BlockPlaceholder = styled.div({
    border: '3px dashed #d9edf7',
    height: 'calc(100% - 10px)',
    margin: '5px'
  })
}

export interface ColumnProps {
  state: MatchingExercisePluginState
  blocks: [B | undefined, B | undefined][]
  title?: string
  undo?: (block: B) => void
  renderBlock: (block: React.ReactNode, index: number) => React.ReactNode
}
