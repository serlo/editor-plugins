import { Document } from '@splish-me/editor-core-document'
import { DocumentIdentifier } from '@splish-me/editor-core-types'
import { FetchDimensions } from '@serlo/editor-ui'
import * as R from 'ramda'
import * as React from 'react'

import { StepByStepPluginState, Content, Step } from '.'

const getExplanation = (
  step: Content | Step
): DocumentIdentifier | undefined => {
  if (step.type === 'step') {
    return step.explanation
  }

  return undefined
}

const makeRows = (steps: Array<Content | Step>): Array<OneCol | TwoCols> => {
  let pendingContent: DocumentIdentifier | undefined = undefined
  const ret: Array<OneCol | TwoCols> = []

  steps.forEach(step => {
    if (pendingContent) {
      ret.push({
        type: '2-cols',
        content: [pendingContent, getExplanation(step)]
      })
    }

    if ((!pendingContent && step.type === 'step') || step.type === 'content') {
      ret.push({
        type: '1-col',
        content: step.type === 'step' ? step.explanation : step.content
      })
    }

    pendingContent = step.type === 'step' ? step.content : undefined
  })

  if (pendingContent) {
    ret.push({
      type: '2-cols',
      content: [pendingContent, undefined]
    })
  }

  return ret
}

enum Phase {
  noJS = 0,
  hiddenRender = 1,
  maxWidth = 2,
  height = 3
}

export class StepByStepRenderer extends React.Component<
  StepByStepRendererProps,
  StepByStepState
> {
  private calculateLayout() {
    this.setState({
      phase: Phase.hiddenRender,
      width: [],
      contentHeight: [],
      explanationHeight: []
    })
  }
  state: StepByStepState = {
    phase: Phase.noJS,
    width: [],
    contentHeight: [],
    explanationHeight: []
  }
  public componentDidMount() {
    this.calculateLayout()
    window.addEventListener('resize', () => {
      this.calculateLayout()
    })
  }
  private renderHidden() {
    const { state } = this.props
    const rows = makeRows(state.steps)

    if (this.state.phase < Phase.hiddenRender) {
      return null
    }

    const rowsWith2Cols = rows.filter(row => row.type === '2-cols')
    const n = rowsWith2Cols.length
    return (
      <div>
        <FetchDimensions
          key={this.state.phase}
          length={2 * n}
          onDone={({ heights, widths }) => {
            console.log(this.state.phase)
            if (this.state.phase < Phase.maxWidth) {
              this.setState({
                phase: Phase.maxWidth,
                width: R.take(rows.length, widths)
              })
            } else if (this.state.phase === Phase.maxWidth) {
              this.setState({
                phase: Phase.height,
                contentHeight: R.take(rows.length, heights),
                explanationHeight: R.drop(rows.length, heights)
              })
            }
          }}
          render={createRef => {
            return rows.map((row, index) => {
              if (row.type === '1-col') {
                return (
                  <div
                    key={index}
                    // className="row"
                    style={{
                      visibility:
                        this.state.phase < Phase.height ? 'hidden' : undefined
                    }}
                  >
                    <div>
                      <Document state={row.content} />
                    </div>
                  </div>
                )
              }

              const rowsWith2ColIndex = rowsWith2Cols.indexOf(row)

              let column = false
              if (this.state.phase === Phase.height) {
                const diff =
                  (this.state.explanationHeight[index] || 0) -
                  (this.state.contentHeight[index] || 0)
                if (diff > 30) column = true
              }

              return (
                <div
                  key={index}
                  // className="row"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: column ? 'column' : undefined,
                    visibility:
                      this.state.phase < Phase.height ? 'hidden' : undefined
                  }}
                >
                  <div
                    style={{
                      flexShrink:
                        this.state.phase < Phase.height ? 0 : undefined,
                      paddingRight: '10px',
                      width:
                        this.state.phase < Phase.maxWidth
                          ? 'auto'
                          : R.reduce<number, number>(
                              R.max,
                              0,
                              this.state.width.filter(Boolean)
                            ) + 10
                    }}
                    ref={createRef(rowsWith2ColIndex)}
                  >
                    <Document state={row.content[0]} />
                  </div>
                  <div ref={createRef(rowsWith2ColIndex + n)}>
                    {row.content[1] === undefined ? null : (
                      <Document state={row.content[1]} />
                    )}
                  </div>
                </div>
              )
            })
          }}
        />
      </div>
    )
  }
  public render() {
    const { state } = this.props

    const rows = makeRows(state.steps)
    return (
      <React.Fragment>
        {this.state.phase === Phase.noJS ? (
          <React.Fragment>
            {rows.map((row, index) => {
              if (row.type === '1-col') {
                return (
                  <div key={index} className="row">
                    <div className="col-sm-12">
                      <Document state={row.content} />
                    </div>
                  </div>
                )
              }
              return (
                <div key={index} className="row">
                  <div className="col-sm-12 col-md-6">
                    <Document state={row.content[0]} />
                  </div>
                  {row.content[1] === undefined ? null : (
                    <div className="col-sm-12 col-md-6">
                      <Document state={row.content[1]} />
                    </div>
                  )}
                </div>
              )
            })}
          </React.Fragment>
        ) : null}
        {this.renderHidden()}
      </React.Fragment>
    )
  }
}

export interface StepByStepRendererProps {
  state: StepByStepPluginState
}

export interface StepByStepState {
  phase: Phase
  width: number[]
  contentHeight: number[]
  explanationHeight: number[]
}

interface OneCol {
  type: '1-col'
  content: DocumentIdentifier
}

interface TwoCols {
  type: '2-cols'
  content: [DocumentIdentifier, DocumentIdentifier | undefined]
}
