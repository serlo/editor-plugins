import { css } from 'emotion'
import * as React from 'react'
import { Block as B, Block } from './types'
import { MobileColumn as Column } from './mobile.column.component'
import { MobileRow as Row } from './mobile.row.component'
import { MatchingExercisePluginState } from './editable.component'
import { combineBlocks, isCorrect, isCorrectPerRow } from './helpers'
import * as R from 'ramda'

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

    this.setState(
      { [side]: newSide, stack: newStack } as Pick<MatchingExerciseRendererState, "stack" | typeof side>,
      () => {
        if (side === 'rightSide') {
          const test = isCorrectPerRow(this.props.state, [
            R.last(this.state.leftSide),
            R.last(this.state.rightSide)
          ])
          if (!test) {
            const newLeftSide = [...this.state.leftSide]
            const left = newLeftSide.pop()

            if (!left) {
              return
            }

            const newRightSide = [...this.state.rightSide]
            const right = newRightSide.pop()

            if (!right) {
              return
            }

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
    const blocks = R.zip(
      leftSide as (Block | undefined)[],
      (rightSide as (Block | undefined)[]).concat(
        R.repeat(undefined, leftSide.length - rightSide.length)
      )
    ) as [B | undefined, B | undefined][]
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
            blocks={blocks}
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
