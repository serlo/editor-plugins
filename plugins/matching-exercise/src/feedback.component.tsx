import {
  Editable,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import { css } from 'emotion'
import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { Column } from './column.component'
import {
  MatchingExerciseEditable,
  MatchingExercisePluginState
} from './editable.component'
import { Block } from './types'

interface MatchingExerciseRendererProps {
  state: MatchingExercisePluginState
}

interface MatchingExerciseRendererState {
  leftSide: Block[]
  rightSide: Block[]
  stack: Block[]
}

const generateBlocks = ({
  solution,
  blockContent
}: MatchingExercisePluginState): number[] => {
  const s = solution as Array<number[]>
  const usedBlocks = ([] as number[]).concat(...s)

  const unusedBlocks = blockContent
    .map((_content, block) => {
      return block
    })
    .filter(block => {
      return usedBlocks.indexOf(block) < 0
    })

  return [...usedBlocks, ...unusedBlocks]
}

export class MatchingExerciseFeedback extends React.Component<
  MatchingExerciseRendererProps,
  MatchingExerciseRendererState
> {
  constructor(props: MatchingExerciseRendererProps) {
    super(props)

    const blocks = generateBlocks(props.state).map((item, index) => {
      return {
        id: `${index}`,
        // FIXME:
        block: item,
        content: item //<Editable id={props.state.blockContent[item]} />
      }
    })
    const left = []
    const right = []
    const stacks = []
    blocks.forEach(element => {
      props.state.solution.map(pair => {
        if (element.block === pair[0]) {
          left.push(element)
        } else if (element.block === pair[1]) {
          right.push(element)
        } else {
          stacks.push(element)
        }
      })
    })
    this.state = {
      leftSide: left,
      rightSide: right,
      stack: stacks
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
        <DragDropContext
        // onDragStart={(...args) => console.log('onDragStart', args)}
        >
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
