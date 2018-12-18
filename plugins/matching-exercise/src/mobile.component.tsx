import { css } from 'emotion'
import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Block } from './types'
import { MobileColumn as Column } from './mobile.column.component'
import { MobileRow as Row } from './mobile.row.component'
import {
  MatchingExerciseEditable,
  MatchingExercisePluginState
} from './editable.component'
import {
  Editable,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import {
  generateBlocks,
  combineBlocks,
  isCorrect,
  isCorrectPerRow
} from './helpers'
import * as R from 'ramda'
import { Stack } from 'immutable'

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
  moveBlock = (index: number) => (block: Block) => {
    const side =
      this.state.leftSide > this.state.rightSide ? 'rightSide' : 'leftSide'
    const newSide = [...this.state[side]]
    newSide.push(block)
    const newStack = [...this.state.stack]
    newStack.splice(index, 1)
    console.log(newStack)
    this.setState(
      { [side as 'leftSide' | 'rightSide']: newSide, stack: newStack },
      () => {
        if (side === 'rightSide') {
          const test = isCorrectPerRow(this.props.state, [
            R.last(this.state.leftSide),
            R.last(this.state.rightSide)
          ])
          if (!test) {
            const newLeftSide = [...this.state.leftSide]
            const left = newLeftSide.pop()
            const newRightSide = [...this.state.rightSide]
            const right = newRightSide.pop()
            const newStack = [...this.state.stack]
            newStack.push(left, right)
            setTimeout(() => {
              this.setState({
                leftSide: newLeftSide,
                rightSide: newRightSide,
                stack: newStack
              })
            }, 2000)
          }
        }
      }
    )
  }
  undo = (block: Block) => {
    const newLeftSide = [...this.state.leftSide]
    newLeftSide.pop()
    const newStack = [...this.state.stack]
    newStack.push(block)
    this.setState({ leftSide: newLeftSide, stack: newStack })
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
          <Column blocks={stack} move={this.moveBlock} />
        </div>

        <div>
          <Row
            blocks={R.zip(
              leftSide as (Block | undefined)[],
              (rightSide as (Block | undefined)[]).concat(
                R.repeat(undefined, leftSide.length - rightSide.length)
              )
            )}
            title="Funktion/Ableitung"
            state={this.props.state}
            undo={this.undo}
          />
        </div>
        <button
          className={css`
            background: gold;
            color: silver;
          `}
          onClick={() => {
            const removeIncompletePairs = (): Promise<void> => {
              return new Promise(resolve => {
                if (this.state.leftSide.length > this.state.rightSide.length) {
                  let newLeftSide = [...this.state.leftSide]
                  const block = newLeftSide.pop() as Block
                  const newStack = [...this.state.stack, block]
                  this.setState(
                    { leftSide: newLeftSide, stack: newStack },
                    () => {
                      setTimeout(() => {
                        resolve()
                      }, 0)
                    }
                  )
                } else {
                  resolve()
                }
              })
            }

            removeIncompletePairs().then(() => {
              const correct = isCorrect(this.props.state, this.state)

              alert(correct ? 'Richtig' : 'Es fehlen noch Lösungen')
            })
          }}
        >
          Bin fertig :)
        </button>
      </React.Fragment>
    )
  }
}
