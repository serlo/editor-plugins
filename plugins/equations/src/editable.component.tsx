import * as R from 'ramda'
import * as React from 'react'
import {
  Editable,
  EditableIdentifier,
  createEditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { css, cx } from 'emotion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { Equations, EquationsProps } from './equations.component'
import { stat } from 'fs'

export class EquationsEditable extends React.Component<EquationsProps> {
  addButton = () => {
    const { onChange, state } = this.props

    onChange({
      steps: [
        ...state.steps,
        {
          content: createEditableIdentifier(),
          explanation: createEditableIdentifier()
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
                          draggableId={step.content.id}
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
                                {step.explanation === undefined ? null : (
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
                                    <strong>Explanation</strong>
                                    <div
                                      className={css({
                                        cursor: 'auto',
                                        background: '#fff'
                                      })}
                                    >
                                      <Editable id={step.explanation} />
                                    </div>
                                  </div>
                                )}
                                <div className="col-xs-12">
                                  <strong>Content</strong>
                                  <div
                                    className={css({
                                      cursor: 'auto',
                                      background: '#fff'
                                    })}
                                  >
                                    <Editable id={step.content} />
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
