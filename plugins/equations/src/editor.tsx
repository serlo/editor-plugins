import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  EquationsPluginState,
  EquationsRenderer,
  EquationsRendererProps
} from '@serlo-org/editor-plugin-equations-renderer'
import {
  Document,
  createDocumentIdentifier
} from '@splish-me/editor-core-document'
import * as R from 'ramda'
import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const DraggableContainer = styled.div({
  border: '1px solid #000',
  margin: '10px',
  background: 'lightgrey',
  padding: '10px'
})

const RemoveButton = styled.button({
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
})

const ColWrapper = styled.div({
  cursor: 'auto',
  background: '#fff'
})

const AddButton = styled.button({
  borderRadius: '50%',
  outline: 'none',
  width: '35px',
  height: '35px',
  border: 'none',
  margin: 'auto'
})

const AddButtonWrapper = styled.div({
  textAlign: 'center'
})

export class EquationsEditor extends React.Component<EquationsEditorProps> {
  addButton = () => {
    const { onChange, state } = this.props
    onChange({
      steps: [
        ...state.steps,
        {
          left: createDocumentIdentifier(),
          right: createDocumentIdentifier(),
          transform: createDocumentIdentifier()
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
                              <DraggableContainer
                                className="row"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="col-xs-12">
                                  <RemoveButton
                                    onClick={this.removeButton(index)}
                                  >
                                    <FontAwesomeIcon icon={faTimes} />
                                  </RemoveButton>
                                </div>
                                <div className="col-xs-4">
                                  <strong>Left Side</strong>
                                  <ColWrapper>
                                    <Document state={step.left} />
                                  </ColWrapper>
                                </div>
                                <div className="col-xs-4">
                                  <strong>Right Side</strong>
                                  <ColWrapper>
                                    <Document state={step.right} />
                                  </ColWrapper>
                                </div>
                                <div className="col-xs-4">
                                  <strong>Transformation</strong>
                                  <ColWrapper>
                                    <Document state={step.transform} />
                                  </ColWrapper>
                                </div>
                              </DraggableContainer>
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
          <AddButtonWrapper>
            <AddButton onClick={this.addButton}>
              <FontAwesomeIcon icon={faPlus} />
            </AddButton>
          </AddButtonWrapper>
        </React.Fragment>
      )
    }

    return <EquationsRenderer state={state} />
  }
}

export interface EquationsEditorProps extends EquationsRendererProps {
  focused?: boolean
  readOnly?: boolean
  onChange: (state: Partial<EquationsPluginState>) => void
}
