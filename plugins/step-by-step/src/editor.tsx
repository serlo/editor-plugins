import {
  StepByStepPluginState,
  StepByStepRenderer,
  StepByStepRendererProps
} from '@serlo-org/editor-plugin-step-by-step-renderer'
import { Icon, faPlus, faTimes, styled } from '@serlo-org/editor-ui'
import {
  createDocumentIdentifier,
  Document
} from '@splish-me/editor-core-document'
import * as R from 'ramda'
import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export class StepByStepEditor extends React.Component<StepByStepEditorProps> {
  addButton = () => {
    const { onChange, state } = this.props

    onChange({
      steps: [
        ...state.steps,
        {
          content: createDocumentIdentifier(),
          explanation: createDocumentIdentifier(),
          type: 'step'
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
    console.log(state)
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
                              <this.DraggableContainer
                                className="row"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="col-xs-12">
                                  <this.RemoveButton
                                    onClick={this.removeButton(index)}
                                  >
                                    <Icon icon={faTimes} />
                                  </this.RemoveButton>
                                  <form
                                    onChange={event => {
                                      const newSteps = [
                                        ...this.props.state.steps
                                      ]

                                      // @ts-ignore TODO:
                                      const type = event.target.value
                                      newSteps[index] = {
                                        type,
                                        content: newSteps[index].content,
                                        explanation:
                                          type === 'step'
                                            ? createDocumentIdentifier()
                                            : undefined
                                      }
                                      this.props.onChange({ steps: newSteps })
                                    }}
                                  >
                                    <label>
                                      <input
                                        type="radio"
                                        name="type"
                                        value="step"
                                        defaultChecked={step.type === 'step'}
                                      />
                                      with Explanation
                                    </label>
                                    <label>
                                      <input
                                        type="radio"
                                        name="type"
                                        value="content"
                                        defaultChecked={step.type === 'content'}
                                      />
                                      without Explanation
                                    </label>
                                  </form>
                                </div>
                                {step.type === 'step' ? (
                                  <div className="col-xs-12">
                                    <strong>Explanation</strong>
                                    <this.StepFieldContainer>
                                      <Document state={step.explanation} />
                                    </this.StepFieldContainer>
                                  </div>
                                ) : null}

                                <div className="col-xs-12">
                                  <strong>Content</strong>
                                  <this.StepFieldContainer>
                                    <Document state={step.content} />
                                  </this.StepFieldContainer>
                                </div>
                              </this.DraggableContainer>
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
          <this.AddButtonContainer>
            <this.AddButton onClick={this.addButton}>
              <Icon icon={faPlus} />
            </this.AddButton>
          </this.AddButtonContainer>
        </React.Fragment>
      )
    }

    return <StepByStepRenderer state={state} />
  }

  private DraggableContainer = styled.div({
    border: '1px solid #000',
    margin: '10px',
    background: 'lightgrey',
    padding: '10px'
  })

  private RemoveButton = styled.button({
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

  private AddButtonContainer = styled.div({
    textAlign: 'center'
  })

  private AddButton = styled.button({
    borderRadius: '50%',
    outline: 'none',
    width: '35px',
    height: '35px',
    border: 'none',
    margin: 'auto'
  })

  private StepFieldContainer = styled.div({
    cursor: 'auto',
    background: '#fff'
  })
}

interface StepByStepEditorProps extends StepByStepRendererProps {
  onChange: (state: Partial<StepByStepPluginState>) => void
  readOnly?: boolean
}
