import { css } from 'emotion'
import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Block } from './types'
import { MobileColumn as Column } from './mobile.column.component'
import {
  MatchingExerciseEditable,
  MatchingExercisePluginState
} from './editable.component'
import {
  Editable,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import { generateBlocks, combineBlocks, isCorrect } from './helpers'

interface MatchingExerciseRendererProps {
  state: MatchingExercisePluginState
}

interface MatchingExerciseRendererState {
  leftSide: Block[]
  rightSide: Block[]
  stack: Block[]
}

export class MatchingExerciseMobile extends React.Component<
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
  moveBlock = (block: Block) => {
    const side =
      this.state.leftSide > this.state.rightSide ? 'rightSide' : 'leftSide'
    const newSide = [...this.state[side]]
    newSide.push(block)
    this.setState({ [side as 'leftSide' | 'rightSide']: newSide })
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
        <div
          className={css`
            margin: '0 auto';
          `}
        >
          <Column id="stack" blocks={stack} move={this.moveBlock} />
        </div>

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
          <Column
            id="leftSide"
            blocks={leftSide}
            title="Funktion"
            width="50%"
          />
          <Column
            id="rightSide"
            blocks={rightSide}
            title="Ableitung"
            width="50%"
          />
        </div>
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
