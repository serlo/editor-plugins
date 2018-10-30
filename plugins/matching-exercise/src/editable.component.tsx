import * as React from 'react'
import { Column } from './column.component'
import { Block as B } from './types'
// @ts-ignore
import { DragDropContext } from 'react-beautiful-dnd'
import { css } from 'emotion'
import {
  createEditableIdentifier,
  EditableIdentifier,
  Editable
} from '@splish-me/editor-core/lib/editable.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'

interface MatchingExercisePluginState {
  solution: Array<[number, number]>
  blockContent: Array<EditableIdentifier>
}

export class MatchingExerciseEditable extends React.Component {
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
    const stack: B[] = blockContent.map((id, index) => {
      const content = <Editable id={id} />
      return {
        id: `stack-${id.id}`,
        block: index,
        content: content
      }
    })
    const options = blockContent.map((id, index) => {
      return {
        value: index
      }
    })

    const leftSideTitle = 'Linke Seite'
    const rightSideTitle = 'Rechte Seite'

    return (
      <DragDropContext>
        <div style={{ display: 'flex' }}>
          <Column id="stack" blocks={stack}>
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
            {solution.map(([left, right], index) => {
              return (
                <Select
                  key={index}
                  options={options}
                  value={options[left]}
                  onChange={this.leftSideChange(index)}
                  getOptionLabel={option => `block-${option.value}`}
                />
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
            {solution.map(([left, right], index) => {
              return (
                <Select
                  key={index}
                  options={options}
                  value={options[right]}
                  onChange={this.rightSideChange(index)}
                  getOptionLabel={option => `block-${option.value}`}
                />
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
