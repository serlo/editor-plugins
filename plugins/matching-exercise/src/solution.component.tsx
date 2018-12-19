import { css } from 'emotion'
import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { Column } from './column.component'
import { MatchingExercisePluginState } from './editable.component'
import { Block } from './types'
import { generateBlocks, createBlocks } from './helpers'

interface MatchingExerciseRendererProps {
  state: MatchingExercisePluginState
}

interface MatchingExerciseRendererState {
  leftSide: Block[]
  rightSide: Block[]
  stack: Block[]
}

export class MatchingExerciseSolution extends React.Component<
  MatchingExerciseRendererProps,
  MatchingExerciseRendererState
> {
  constructor(props: MatchingExerciseRendererProps) {
    super(props)

    const blocks = generateBlocks(props.state).unusedBlocks.map(
      (item, index) => {
        return {
          id: `${index}`,
          // FIXME:
          block: item,
          content: item //<Editable id={props.state.blockContent[item]} />
        }
      }
    )
    const leftBlocks = props.state.solution.map(([left, _right], index) => {
      return createBlocks(left, `left-${index}`)
    })
    const rightBlocks = props.state.solution.map(([_left, right], index) => {
      return createBlocks(right, `right-${index}`)
    })
    this.state = {
      leftSide: leftBlocks,
      rightSide: rightBlocks,
      stack: blocks
    }
  }

  render() {
    console.log(this.state)
    const { leftSide, rightSide, stack } = this.state

    console.log(
      [...leftSide, ...rightSide, ...stack].map(item => {
        return {
          id: `${item.id}-whatever`,
          block: item.block
        }
      })
    )

    return (
      <React.Fragment>
        <DragDropContext>
          {' '}
          <div
            className={css`
              display: flex;
            `}
            ref={div => {
              if (!div) {
                return
              }

              console.log(div.clientHeight)

              // @ts-ignore FIXME:
              div.style = `height: ${div.clientHeight}px`
            }}
          >
            {' '}
            <Column id="stack" blocks={stack} />
            <Column id="leftSide" blocks={leftSide} title="Funktion" />
            <Column id="rightSide" blocks={rightSide} title="Ableitung" />
          </div>
        </DragDropContext>
      </React.Fragment>
    )
  }
}
