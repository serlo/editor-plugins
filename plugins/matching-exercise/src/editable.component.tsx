import {
  createEditableIdentifier,
  EditableIdentifier,
  Editable
} from '@splish-me/editor-core/lib/editable.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { css } from 'emotion'
import * as React from 'react'
// @ts-ignore
import { DragDropContext } from 'react-beautiful-dnd'
import Select from 'react-select'

import { Column } from './column.component'
import { Block as B } from './types'

export interface MatchingExercisePluginState {
  solution: Array<[number, number]>
  blockContent: Array<EditableIdentifier>
}

export interface MatchingExerciseEditableProps {
  onChange: (state: Partial<MatchingExercisePluginState>) => void
  state: MatchingExercisePluginState,
}

export class MatchingExerciseEditable extends React.Component<MatchingExerciseEditableProps> {
  removeButtonStack = rowIndex => () => {
    const { onChange, state } = this.props

    const newBlockContent = [...state.blockContent]
    newBlockContent.splice(rowIndex, 1)

    onChange({
      blockContent: newBlockContent
    })
  }
  removeButtonSolution = rowIndex => () => {
    const { onChange, state } = this.props

    const newSolution = [...state.solution]
    newSolution.splice(rowIndex, 1)

    onChange({
      solution: newSolution
    })
  }
  addButtonStack = () => {
    const { onChange, state } = this.props

    onChange({
      blockContent: [...state.blockContent, createEditableIdentifier()]
    })
  }
  addButtonSolution = () => {
    const { onChange, state } = this.props

    onChange({
      solution: [...state.solution, [0, 0]]
    })
  }
  leftSideChange = rowIndex => option => {
    const { onChange, state } = this.props

    const newSolution = [...state.solution]
    newSolution[rowIndex] = [option.value, newSolution[rowIndex][1]]

    onChange({
      solution: newSolution
    })
  }
  rightSideChange = rowIndex => option => {
    const { onChange, state } = this.props

    const newSolution = [...state.solution]
    newSolution[rowIndex] = [newSolution[rowIndex][0], option.value]

    onChange({
      solution: newSolution
    })
  }

  public render() {
    const { solution, blockContent } = this.props.state
    const stack: B[] = blockContent
      .map((id, index) => {
      const content = <Editable id={id} />
      return {
        id: `stack-${id.id}`,
        block: index,
        content: content
      }
    })
    const options = blockContent.map((_id, index) => {
      return {
        value: index
      }
    })

    const leftSideTitle = 'Linke Seite'
    const rightSideTitle = 'Rechte Seite'

    /* if (readOnly) {
      return <MatchingExerciseRenderer {...this.props} />
    }
     */
    return (
      <DragDropContext>
        <div style={{ display: 'flex' }}>
          <Column
            id="stack"
            blocks={stack}
            renderBlock={(block, index) => {
              return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    className={css({
                      flexGrow: 1
                    })}
                  >
                    {block}
                  </div>
                  <button
                    onClick={this.removeButtonStack(index)}
                    className={css({
                      borderRadius: '50%',
                      outline: 'none',
                      width: '35px',
                      height: '35px',
                      border: 'none',
                      display: 'block',
                      margin: '5px'
                    })}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              )
            }}
          >
            <button
              onClick={this.addButtonStack}
              className={css({
                borderRadius: '50%',
                outline: 'none',
                width: '35px',
                height: '35px',
                border: 'none',
                margin: 'auto',
                display: 'block'
              })}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </Column>
          <Column id="leftSide" blocks={[]} title={leftSideTitle}>
            {solution.map(([left], index) => {
              return (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Select
                    options={options}
                    value={options[left]}
                    onChange={this.leftSideChange(index)}
                    getOptionLabel={option => `block-${option.value}`}
                    className={css({
                      flexGrow: 1,
                      margin: '5px'
                    })}
                  />
                  <button
                    onClick={this.removeButtonSolution(index)}
                    className={css({
                      borderRadius: '50%',
                      outline: 'none',
                      width: '35px',
                      height: '35px',
                      border: 'none',
                      display: 'block',
                      margin: '5px',
                      marginLeft: '0'
                    })}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              )
            })}
            <button
              onClick={this.addButtonSolution}
              className={css({
                borderRadius: '50%',
                outline: 'none',
                width: '35px',
                height: '35px',
                border: 'none',
                margin: 'auto',
                display: 'block'
              })}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </Column>
          <Column id="rightSide" blocks={[]} title={rightSideTitle}>
            {solution.map(([_left, right], index) => {
              return (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Select
                    key={index}
                    options={options}
                    value={options[right]}
                    onChange={this.rightSideChange(index)}
                    getOptionLabel={option => `block-${option.value}`}
                    className={css({
                      flexGrow: 1,
                      margin: '5px'
                    })}
                  />
                  <button
                    onClick={this.removeButtonSolution(index)}
                    className={css({
                      borderRadius: '50%',
                      outline: 'none',
                      width: '35px',
                      height: '35px',
                      border: 'none',
                      display: 'block',
                      margin: '5px',
                      marginLeft: '0'
                    })}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              )
            })}
            <button
              onClick={this.addButtonSolution}
              className={css({
                borderRadius: '50%',
                outline: 'none',
                width: '35px',
                height: '35px',
                border: 'none',
                margin: 'auto',
                display: 'block'
              })}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </Column>
        </div>
      </DragDropContext>
    )
  }
}


