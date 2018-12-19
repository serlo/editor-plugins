import * as R from 'ramda'
import * as React from 'react'
import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { css, cx } from 'emotion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Equations, EquationsProps } from './equations.component'

export class EquationsEditable extends React.Component<EquationsProps> {
  addButton = () => {
    const { onChange, state } = this.props
    onChange({
      steps: [
        ...state.steps,
        {
          left: createEditableIdentifier(),
          right: createEditableIdentifier(),
          transform: createEditableIdentifier()
        }
      ]
    })
  }
  removeButton = (index: number) => () => {
    const { onChange, state } = this.props
    onChange({
      steps: R.remove(index, 1, state.steps)
    })
  }
  public render() {
    const { readOnly, state } = this.props
    if (!readOnly) {
      return (
        <React.Fragment>
          <DragDropContext
            onDragEnd={result => {
              const { source, destination } = result
              if (!destination) {
                return
              }
              const newSteps = [...this.props.state.steps]
              const [temp] = newSteps.splice(source.index, 1)
              newSteps.splice(destination.index, 0, temp)
              this.props.onChange({ steps: newSteps })
            }}
          >
            <Droppable droppableId="default" direction="vertical">
              {(provided: any) => {
                return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {state.steps.map((step, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={step.left.id}
                          index={index}
                        >
                          {(provided: any) => {
                            return (
                              <div
                                className={cx(
                                  css({
                                    border: '1px solid #000',
                                    margin: '10px',
                                    background: 'lightgrey',
                                    padding: '10px'
                                  }),
                                  'row'
                                )}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="col-xs-12">
                                  <button
                                    onClick={this.removeButton(index)}
                                    className={css({
                                      borderRadius: '50%',
                                      outline: 'none',
                                      width: '35px',
                                      height: '35px',
                                      border: 'none',
                                      float: 'right',
                                      background: 'transparent',
                                      position: 'relative',
                                      top: '-15px',
                                      right: '-30px'
                                    })}
                                  >
                                    <FontAwesomeIcon icon={faTimes} />
                                  </button>
                                </div>
                                <div className="col-xs-4">
                                  <strong>Left Side</strong>
                                  <div
                                    className={css({
                                      cursor: 'auto',
                                      background: '#fff'
                                    })}
                                  >
                                    <Editable id={step.left} />
                                  </div>
                                </div>
                                <div className="col-xs-4">
                                  <strong>Right Side</strong>
                                  <div
                                    className={css({
                                      cursor: 'auto',
                                      background: '#fff'
                                    })}
                                  >
                                    <Editable id={step.right} />
                                  </div>
                                </div>
                                <div className="col-xs-4">
                                  <strong>Transformation</strong>
                                  <div
                                    className={css({
                                      cursor: 'auto',
                                      background: '#fff'
                                    })}
                                  >
                                    <Editable id={step.transform} />
                                  </div>
                                </div>
                              </div>
                            )
                          }}
                        </Draggable>
                      )
                    })}
                  </div>
                )
              }}
            </Droppable>
          </DragDropContext>
          <div
            className={css({
              textAlign: 'center'
            })}
          >
            <button
              onClick={this.addButton}
              className={css({
                borderRadius: '50%',
                outline: 'none',
                width: '35px',
                height: '35px',
                border: 'none',
                margin: 'auto'
              })}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </React.Fragment>
      )
    }
    return <Equations {...this.props} />
  }
}
