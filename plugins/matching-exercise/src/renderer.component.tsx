import { css } from 'emotion'
import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Block } from './types'
import { Column } from './column.component'
import {
  MatchingExerciseEditable,
  MatchingExercisePluginState
} from './editable.component'
import {
  Editable,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import { generateBlocks, combineBlocks, isCorrect } from './helpers'

export interface MatchingExerciseRendererProps {
  state: MatchingExercisePluginState
}

export interface MatchingExerciseRendererState {
  leftSide: Block[]
  rightSide: Block[]
  stack: Block[]
}

export class MatchingExerciseRenderer extends React.Component<
  MatchingExerciseRendererProps,
  MatchingExerciseRendererState
> {
  constructor(props: MatchingExerciseRendererProps) {
    super(props)

    const blocks = combineBlocks(props.state).map((item, index) => {
      return {
        id: `${index}`,
        // FIXME:
        block: item,
        content: item //<Editable id={props.state.blockContent[item]} />
      }
    })

    this.state = {
      leftSide: [],
      rightSide: [],
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
        <DragDropContext
          // onDragStart={(...args) => console.log('onDragStart', args)}
          onDragEnd={result => {
            const { source, destination } = result

            if (!destination) {
              // TODO: insert into stack
              return
            }

            const sourceId = source.droppableId as
              | 'leftSide'
              | 'rightSide'
              | 'stack'
            const sourceList = [...this.state[sourceId]]
            const [temp] = sourceList.splice(source.index, 1)

            if (source.droppableId === destination.droppableId) {
              sourceList.splice(destination.index, 0, temp)

              // @ts-ignore FIXME:
              this.setState({
                [sourceId]: sourceList
              })
            } else {
              const destinationId = destination.droppableId as
                | 'leftSide'
                | 'rightSide'
                | 'stack'
              const destinationList = [...this.state[destinationId]]
              destinationList.splice(destination.index, 0, temp)

              // @ts-ignore FIXME:
              this.setState({
                [sourceId]: sourceList,
                [destinationId]: destinationList
              })
            }
          }}
        >
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
            <Column id="stack" blocks={stack} />
            <Column id="leftSide" blocks={leftSide} title="Funktion" />
            <Column id="rightSide" blocks={rightSide} title="Ableitung" />
          </div>
        </DragDropContext>
        <button
          className={css`
            background: gold;
            color: silver;
          `}
          onClick={() => {
            const correct = isCorrect(this.props.state, this.state)

            alert(correct ? 'Richtig' : 'Falsch')
          }}
        >
          Submit
        </button>
      </React.Fragment>
    )
  }
}
