import { Answer, ScMcExercisePluginState } from '.'
import * as React from 'react'
import { calculateLayoutOptions } from './helpers'
import * as R from 'ramda'
import { styled, FetchDimensions } from '@serlo/editor-ui'

enum Phase {
  noJS = 0,
  optionTesting = 1,
  finished = 2
}

export class ScMcAnswersRenderer extends React.Component<
  {
    state: ScMcExercisePluginState
    showAnswer: (
      answer: Answer,
      index: number,
      centered: boolean
    ) => React.ReactNode
  },
  ScMcAnswersRendererState
> {
  state = { phase: Phase.noJS, remainingOptions: [] }
  public render() {
    const options = calculateLayoutOptions(this.props.state.answers.length)

    if (this.state.phase === Phase.noJS) {
      return this.renderOption([this.props.state.answers.length, 1])
    }
    const currentOption = this.state.remainingOptions[0]

    if (this.state.phase === Phase.finished) {
      return this.renderOption(currentOption)
    }
    return this.tryOption(currentOption)
  }
  private tryOption(option: [number, number]) {
    return (
      <FetchDimensions
        key={option.toString()}
        length={this.props.state.answers.length + 1}
        onDone={({ widths, scrollWidths, heights }) => {
          console.log(widths, scrollWidths)
          const adequateRatio = heights.every((height, index) => {
            return 1.5 * height <= widths[index]
          })
          const [containerWidth, ...boxWidths] = widths
          const equalWidths = boxWidths.every(width => {
            return width === boxWidths[0]
          })
          if (
            containerWidth + 1 >= scrollWidths[0] &&
            equalWidths &&
            adequateRatio
          ) {
            this.setState({ phase: Phase.finished })
          } else {
            this.setState(state => {
              const newOptions = state.remainingOptions.slice(1)
              if (newOptions.length > 0) {
                return { phase: state.phase, remainingOptions: newOptions }
              } else {
                return {
                  remainingOptions: state.remainingOptions,
                  phase: Phase.finished
                }
              }
            })
          }
        }}
        render={createRef => {
          return (
            <div ref={createRef(0)}>{this.renderOption(option, createRef)}</div>
          )
        }}
      />
    )
  }
  private renderOption(
    [_, columns]: [number, number],
    createRef: (index: number) => (instance: HTMLElement | null) => void = () =>
      null
  ) {
    const rows = R.splitEvery(columns, this.props.state.answers)
    return rows.map((answers, rowIndex) => {
      return (
        <this.Row key={rowIndex}>
          {answers.map((answer, columnIndex) => {
            return (
              <this.Column
                key={columnIndex}
                ref={createRef(rowIndex * answers.length + columnIndex + 1)}
              >
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
    })
  }

  private calculateLayout() {
    this.setState({
      phase: Phase.optionTesting,
      remainingOptions: calculateLayoutOptions(this.props.state.answers.length)
    })
  }
  public componentDidMount() {
    this.calculateLayout()
    window.addEventListener('resize', () => {
      this.calculateLayout()
    })
  }
  private Row = styled.div({ display: 'flex' })
  // TODO: internal renderer sets margin to 15px -> see Row Class
  private Column = styled.div({
    flexGrow: 1,
    flexBasis: 0,
    flexShrink: 1,
    margin: '0 15px'
  })
}

interface ScMcAnswersRendererState {
  phase: Phase
  remainingOptions: Array<[number, number]>
}
