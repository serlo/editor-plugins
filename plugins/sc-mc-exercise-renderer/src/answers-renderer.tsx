import { Answer, ScMcExercisePluginState } from '.'
import * as React from 'react'
import { calculateLayoutOptions } from './helpers'
import * as R from 'ramda'
import { styled, FetchDimensions } from '@serlo/editor-ui'

export class ScMcAnswersRenderer extends React.Component<{
  state: ScMcExercisePluginState
  showAnswer: (
    answer: Answer,
    index: number,
    centered: boolean
  ) => React.ReactNode
}> {
  public render() {
    const options = calculateLayoutOptions(this.props.state.answers.length)

    return options.map(([_, columns], index) => {
      const rows = R.splitEvery(columns, this.props.state.answers)
      return (
        <FetchDimensions
          key={index}
          length={rows.length + 1}
          onDone={({
            heights,
            widths,
            scrollHeights,
            scrollWidths,
            clientHeights,
            clientWidths
          }) => {
            console.log(widths, scrollWidths, clientWidths)
            //console.log(heights, scrollHeights, clientHeights)
          }}
          render={createRef => {
            return (
              <div ref={createRef(0)}>
                {rows.map((answers, rowIndex) => {
                  return (
                    <this.Row key={rowIndex} ref={createRef(rowIndex + 1)}>
                      {answers.map((answer, columnIndex) => {
                        return (
                          <this.Column key={columnIndex}>
                            {this.props.showAnswer(
                              answer,
                              rowIndex * answers.length + columnIndex,
                              answers.length > 1
                            )}
                          </this.Column>
                        )
                      })}
                    </this.Row>
                  )
                })}
              </div>
            )
          }}
        />
      )
    })
  }
  private Row = styled.div({ display: 'flex' })
  private Column = styled.div({ flexGrow: 1, flexBasis: 0, margin: '0 5px' })
}
