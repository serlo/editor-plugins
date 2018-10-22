import {
  Editable,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import * as R from 'ramda'
import * as React from 'react'

export interface Step {
  content: EditableIdentifier
  explanation?: EditableIdentifier
}

export interface EquationsProps {
  state: { steps: Array<Step> }
}

export interface EquationsState {
  phase: Phase
  width: Array<number | undefined>
  contentHeight: Array<number | undefined>
  explanationHeight: Array<number | undefined>
}

enum Phase {
  noJS = 0,
  hiddenRender = 1,
  maxWidth = 2,
  height = 3
}

export class Equations extends React.Component<EquationsProps> {
  private calculateLayout() {
    this.setState({
      iteration: (this.state.iteration || 0) + 1,
      phase: Phase.hiddenRender,
      width: this.props.state.steps.map(() => {
        return undefined
      }),
      contentHeight: this.props.state.steps.map(() => {
        return undefined
      }),
      explanationHeight: R.init(
        this.props.state.steps.map(() => {
          return undefined
        })
      )
    })
  }
  state: EquationsState = {
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

    const contents = state.steps.map(step => {
      return step.content
    })

    const [firstExplanation, ...explanations] = state.steps.map(step => {
      return step.explanation
    })

    const rows = R.zip(contents, [...explanations, undefined])

    if (this.state.phase < Phase.hiddenRender) {
      return null
    }
    return (
      <div key={this.state.iteration}>
        {firstExplanation === undefined ? null : (
          <div
            // className="row"
            style={{
              visibility: this.state.phase < Phase.height ? 'hidden' : undefined
            }}
          >
            <div>
              <Editable id={firstExplanation} />
            </div>
          </div>
        )}
        {rows.map((row, index) => {
          let column = false
          if (this.state.phase === Phase.height) {
            const diff =
              (this.state.explanationHeight[index] || 0) -
              this.state.contentHeight[index]
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
                  flexShrink: this.state.phase < Phase.height ? 0 : undefined,
                  paddingRight: '10px',
                  width:
                    this.state.phase < Phase.maxWidth
                      ? 'auto'
                      : R.reduce(R.max, 0, this.state.width) + 10
                }}
                ref={ref => {
                  if (index === 0) {
                    console.log(
                      index,
                      this.state.phase,
                      ref && JSON.stringify(ref.offsetWidth)
                    )
                  }
                  if (!ref) {
                    return
                  }

                  /* if (ref.style.width !== 'auto') {
                      console.log(ref.style.width)
                      return
                    } */

                  if (
                    this.state.phase < Phase.maxWidth &&
                    this.state.width[index] === undefined
                  ) {
                    this.setState(
                      state => {
                        return {
                          width: R.update(index, ref.offsetWidth, state.width)
                        }
                      },
                      () => {
                        const all = R.all(width => {
                          return width !== undefined
                        }, this.state.width)

                        if (all) {
                          this.setState(state => {
                            if (state.phase < Phase.maxWidth) {
                              return { phase: Phase.maxWidth }
                            }

                            return null
                          })
                        }
                      }
                    )
                  } else if (
                    this.state.phase === Phase.maxWidth &&
                    this.state.contentHeight[index] === undefined
                  ) {
                    this.setState(
                      state => {
                        return {
                          contentHeight: R.update(
                            index,
                            ref.offsetHeight,
                            state.contentHeight
                          )
                        }
                      },
                      () => {
                        const all = R.all(
                          contentHeight => {
                            return contentHeight !== undefined
                          },
                          [
                            ...this.state.contentHeight,
                            ...this.state.explanationHeight
                          ]
                        )

                        if (all) {
                          this.setState(state => {
                            if (state.phase < Phase.height) {
                              return { phase: Phase.height }
                            }

                            return null
                          })
                        }
                      }
                    )
                  }
                }}
              >
                <Editable id={row[0]} />
              </div>
              {row[1] === undefined ? null : (
                <div
                  ref={ref => {
                    if (!ref) {
                      return
                    }

                    if (
                      this.state.phase === Phase.maxWidth &&
                      this.state.explanationHeight[index] === undefined
                    ) {
                      this.setState(
                        state => {
                          return {
                            explanationHeight: R.update(
                              index,
                              ref.offsetHeight,
                              state.explanationHeight
                            )
                          }
                        },
                        () => {
                          const all = R.all(
                            explanationHeight => {
                              return explanationHeight !== undefined
                            },
                            [
                              ...this.state.contentHeight,
                              ...this.state.explanationHeight
                            ]
                          )

                          if (all) {
                            this.setState(state => {
                              if (state.phase < Phase.height) {
                                return { phase: Phase.height }
                              }

                              return null
                            })
                          }
                        }
                      )
                    }
                  }}
                >
                  <Editable id={row[1]} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
  public render() {
    const { state } = this.props

    const contents = state.steps.map(step => {
      return step.content
    })

    const [firstExplanation, ...explanations] = state.steps.map(step => {
      return step.explanation
    })

    const rows = R.zip(contents, [...explanations, undefined])
    return (
      <React.Fragment>
        {this.state.phase === Phase.noJS ? (
          <React.Fragment>
            {firstExplanation === undefined ? null : (
              <div className="row">
                <div className="col-sm-12">
                  <Editable id={firstExplanation} />
                </div>
              </div>
            )}
            {rows.map((row, index) => {
              return (
                <div key={index} className="row">
                  <div className="col-sm-12 col-md-6">
                    <Editable id={row[0]} />
                  </div>
                  {row[1] === undefined ? null : (
                    <div className="col-sm-12 col-md-6">
                      <Editable id={row[1]} />
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
