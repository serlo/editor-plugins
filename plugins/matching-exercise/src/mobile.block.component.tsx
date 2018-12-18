import * as React from 'react'
// @ts-ignore
import { Draggable } from 'react-beautiful-dnd'
import { Block as B } from './types'
import { css } from 'emotion'
import posed from 'react-pose'

export interface BlockProps {
  block: B
  active?: boolean
  move?: (block: B) => void
  correct?: boolean
  wrong?: boolean
}

const AnimatedBlock = posed.div({
  nonActive: { background: '#f8f8f8' },
  active: { background: '#d9edf7' },
  correct: { background: '#95bc1a', transition: { delay: 1000 } },
  wrong: { background: '#f7b07c', transition: { delay: 1000 } }
})

export class MobileBlock extends React.Component<BlockProps> {
  render() {
    const { block, move, active, correct, wrong } = this.props
    let pose = 'nonActive'
    if (correct) {
      pose = 'correct'
    } else if (wrong) {
      pose = 'wrong'
    } else if (active) {
      pose = 'active'
    }
    console.log(pose)
    return (
      <AnimatedBlock
        pose={pose}
        initialPose={active ? 'active' : 'nonActive'}
        className={css`
          margin: 5px;
          padding: 5px;
          color: black;
          text-align: center;
          ${move
            ? `&:hover { 
            background: #d9edf7 !important;
            cursor: pointer;}`
            : ''};
        `}
        onClick={() => {
          if (move) {
            move(block)
          }
        }}
      >
        {block.content}
      </AnimatedBlock>
    )
  }
}
