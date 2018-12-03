import {
  Editable,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import * as React from 'react'
import * as R from 'ramda'

interface Step {
  left: EditableIdentifier
  right: EditableIdentifier
  transform: EditableIdentifier
}

interface StepFit {
  step: Step
  fits: boolean
}

export interface EquationsProps {
  state: { steps: Array<Step> }
}

export interface EquationsState {
  phase: Phase
  widthLeftSingle: Array<number | undefined>
  widthLeftDouble: Array<number | undefined>
  widthRightSingle: Array<number | undefined>
  widthRightDouble: Array<number | undefined>
  widthTrans: Array<number | undefined>
  containerWidth: number | undefined
}

enum Phase {
  noJS = 0,
  hiddenRender = 1,
  maxWidthLeft = 2,
  maxWidthRight = 3,
  maxWidthTotal = 4,
  newLine = 5
}

export class Equations extends React.Component<EquationsProps, EquationsState> {
  state: EquationsState = {
    phase: Phase.noJS,
    widthLeftSingle: [],
    widthLeftDouble: [],
    widthRightSingle: [],
    widthRightDouble: [],
    widthTrans: [],
    containerWidth: undefined
  }

  private calculateLayout() {
    const rows = this.props.state.steps

    this.setState({
      phase: Phase.hiddenRender,
      widthLeftSingle: rows.map(() => {
        return undefined
      }),
      widthLeftDouble: rows.map(() => {
        return undefined
      }),
      widthRightSingle: rows.map(() => {
        return undefined
      }),
      widthRightDouble: rows.map(() => {
        return undefined
      }),
      widthTrans: rows.map(() => {
        return undefined
      }),
      containerWidth: undefined
    })
  }

  public componentDidMount() {
    this.calculateLayout()
    window.addEventListener('resize', () => {
      this.calculateLayout()
    })
  }

  private renderHidden() {
    const { state } = this.props
    let tempWidthLeftSingle = R.clone(this.state.widthLeftSingle)
    let tempWidthLeftDouble = R.clone(this.state.widthLeftDouble)
    let tempWidthRightSingle = R.clone(this.state.widthRightSingle)
    let tempWidthRightDouble = R.clone(this.state.widthRightDouble)
    let rows: Array<StepFit>
    let changed = true
    let updated = false
    while (changed) {
      changed = false
      rows = state.steps.map((step, index) => {
        let fit =
          this.state.phase < Phase.maxWidthTotal ||
          R.max(
            R.reduce(R.max, 0, tempWidthLeftSingle.filter(Boolean)),
            tempWidthLeftDouble[index] || 0
          ) <= 20 ||
          R.max(
            R.reduce(R.max, 0, tempWidthLeftSingle.filter(Boolean)),
            tempWidthLeftDouble[index] || 0
          ) +
            R.max(
              R.reduce(R.max, 0, tempWidthRightSingle.filter(Boolean)),
              tempWidthRightDouble[index] || 0
            ) +
            (this.state.widthTrans[index] || 0) <
            (this.state.containerWidth || 0)
        if (!fit && tempWidthLeftDouble[index] === undefined) {
          changed = true
          updated = true
          tempWidthLeftDouble[index] = tempWidthLeftSingle[index]
          tempWidthLeftSingle[index] = undefined
          tempWidthRightDouble[index] = tempWidthRightSingle[index]
          tempWidthRightSingle[index] = undefined
        } else if (
          fit &&
          tempWidthLeftSingle[index] === undefined &&
          this.state.phase >= Phase.maxWidthTotal
        ) {
          changed = true
          updated = true
          tempWidthLeftSingle[index] = tempWidthLeftDouble[index]
          tempWidthLeftDouble[index] = undefined
          tempWidthRightSingle[index] = tempWidthRightDouble[index]
          tempWidthRightDouble[index] = undefined
        }
        return {
          step: step,
          fits: fit
        } as StepFit
      })
    }
    if (this.state.phase < Phase.hiddenRender) {
      return null
    }
    return (
      <div>
        {rows.map((row, index) => {
          return (
            <div
              key={index}
              //2 Listen zur Ausrichtung

              style={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection:
                  this.state.phase > Phase.hiddenRender && !row.fits
                    ? 'column'
                    : undefined,
                visibility:
                  this.state.phase < Phase.maxWidthRight ? 'hidden' : undefined
              }}
              ref={ref => {
                if (!ref) {
                  return
                }
                if (this.state.phase === Phase.hiddenRender) {
                  this.setState(state => {
                    return {
                      containerWidth: ref.offsetWidth
                    }
                  })
                }
                if (this.state.phase < Phase.newLine && updated) {
                  this.setState(() => {
                    return {
                      widthLeftSingle: R.clone(tempWidthLeftSingle),
                      widthLeftDouble: R.clone(tempWidthLeftDouble),
                      widthRightSingle: R.clone(tempWidthRightSingle),
                      widthRightDouble: R.clone(tempWidthRightDouble),
                      phase: Phase.newLine
                    }
                  })
                }
              }}
            >
              <div
                style={{
                  flexShrink: '0',
                  paddingRight: '5px',
                  textAlign: row.fits ? 'right' : undefined,
                  width:
                    this.state.phase < Phase.maxWidthLeft || !row.fits
                      ? 'auto'
                      : Math.ceil(
                          R.reduce(
                            R.max,
                            0,
                            this.state.widthLeftSingle.filter(Boolean)
                          )
                        ) + 1
                }}
                ref={ref => {
                  if (!ref) {
                    return
                  }
                  if (
                    this.state.phase < Phase.maxWidthLeft &&
                    this.state.widthLeftSingle[index] === undefined
                  ) {
                    this.setState(
                      state => {
                        return {
                          widthLeftSingle: R.update(
                            index,
                            ref.offsetWidth,
                            state.widthLeftSingle
                          )
                        }
                      },
                      () => {
                        const all = R.all(width => {
                          return width !== undefined
                        }, this.state.widthLeftSingle)
                        if (all) {
                          this.setState(state => {
                            if (state.phase < Phase.maxWidthLeft) {
                              return { phase: Phase.maxWidthLeft }
                            }
                            return null
                          })
                        }
                      }
                    )
                  }
                }}
              >
                <Editable id={row.step.left} />
              </div>

              <div
                style={{
                  flexShrink: '0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  paddingLeft: row.fits ? undefined : '20px'
                }}
              >
                <div
                  style={{
                    paddingRight:
                      row.step.transform === undefined ? undefined : '10px',
                    width:
                      this.state.phase < Phase.maxWidthRight
                        ? 'auto'
                        : Math.ceil(
                            row.fits
                              ? R.reduce(
                                  R.max,
                                  0,
                                  this.state.widthRightSingle.filter(Boolean)
                                )
                              : this.state.widthRightDouble[index] || 0
                          ) + 1
                  }}
                  ref={ref => {
                    if (!ref) {
                      return
                    }
                    if (
                      this.state.phase < Phase.maxWidthRight &&
                      this.state.widthRightSingle[index] === undefined
                    ) {
                      this.setState(
                        state => {
                          return {
                            widthRightSingle: R.update(
                              index,
                              ref.offsetWidth,
                              state.widthRightSingle
                            )
                          }
                        },
                        () => {
                          const all = R.all(width => {
                            return width !== undefined
                          }, this.state.widthRightSingle)
                          if (all) {
                            this.setState(state => {
                              if (state.phase < Phase.maxWidthRight) {
                                return { phase: Phase.maxWidthRight }
                              }
                              return null
                            })
                          }
                        }
                      )
                    }
                  }}
                >
                  <Editable id={row.step.right} />
                </div>
                {row.step.transform === undefined ? (
                  this.state.widthTrans[index] === undefined ? (
                    this.setState(state => {
                      return {
                        widthTrans: R.update(index, 0, state.widthTrans)
                      }
                    })
                  ) : null
                ) : (
                  <div
                    ref={ref => {
                      if (!ref) {
                        return
                      }
                      if (
                        this.state.phase < Phase.maxWidthTotal &&
                        this.state.widthTrans[index] === undefined
                      ) {
                        this.setState(
                          state => {
                            return {
                              widthTrans: R.update(
                                index,
                                ref.offsetWidth,
                                state.widthTrans
                              )
                            }
                          },
                          () => {
                            const all = R.all(width => {
                              return width !== undefined
                            }, this.state.widthTrans)
                            if (all) {
                              this.setState(state => {
                                if (state.phase < Phase.maxWidthTotal) {
                                  return { phase: Phase.maxWidthTotal }
                                }
                                return null
                              })
                            }
                          }
                        )
                      }
                    }}
                  >
                    <Editable id={row.step.transform} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  public render() {
    const { state } = this.props
    const rows = state.steps
    return (
      <React.Fragment>
        {this.state.phase === Phase.noJS ? (
          <React.Fragment>
            {rows.map((row, index) => {
              return (
                <div key={index} className="row">
                  <div className="col-sm-12 col-md-6">
                    <Editable id={row.left} />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <Editable id={row.right} />
                  </div>
                  {row.transform === undefined ? null : (
                    <div className="col-sm-12 col-md-6">
                      <Editable id={row.transform} />
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
