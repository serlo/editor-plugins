import * as React from 'react'
import { Column } from './column.component'
import { Block as B } from './types'
// @ts-ignore
import { DragDropContext } from 'react-beautiful-dnd'
import { css } from 'emotion'

interface MatchingExercisePluginState {
  solution: Array<[number, number]>
  blockContent: Array<React.ReactNode>
}

export class MatchingExerciseEditable extends React.Component {
  public render() {
    const leftSide: B[] = []
    const rightSide: B[] = []
    const stack: B[] = []
    const leftSideTitle = 'Linke Seite'
    const rightSideTitle = 'Rechte Seite'
    return (
      <DragDropContext>
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
          <Column id="leftSide" blocks={leftSide} title={leftSideTitle} />
          <Column id="rightSide" blocks={rightSide} title={rightSideTitle} />
        </div>
      </DragDropContext>
    )
  }
}
