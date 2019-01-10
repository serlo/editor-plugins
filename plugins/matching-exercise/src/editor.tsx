import {
  Block as B,
  MatchingExercisePluginState
} from '@serlo/editor-plugin-matching-exercise-renderer'
import { Icon, faPlus, faMinus, styled } from '@serlo/editor-ui'
import {
  createDocumentIdentifier,
  Document
} from '@splish-me/editor-core-document'
import * as React from 'react'
// @ts-ignore
import { DragDropContext } from 'react-beautiful-dnd'
import Select from 'react-select'

import { Column } from './column'
import { Props } from 'react-select/lib/Select'
import { OptionsType } from 'react-select/lib/types'

export class MatchingExerciseEditor extends React.Component<
  MatchingExerciseEditorProps
> {
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
      blockContent: [...state.blockContent, createDocumentIdentifier()]
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
      const content = <Document state={id} />
      return {
        id: `stack-${id.id}`,
        block: index,
        content: content
      }
    })
    const options: Option[] = blockContent.map((_id, index) => {
      return {
        value: index
      }
    })

    const leftSideTitle = 'Linke Seite'
    const rightSideTitle = 'Rechte Seite'

    /* if (readOnly) {
      return <MatchingExerciseRenderer {...this.props} />
    }*/

    return (
      <DragDropContext>
        <div style={{ display: 'flex' }}>
          <Column
            id="stack"
            blocks={stack}
            renderBlock={(block, index) => {
              return (
                <this.BlockContainer>
                  <this.Block>{block}</this.Block>
                  <this.RemoveBlockButton
                    onClick={this.removeButtonStack(index)}
                  >
                    <Icon icon={faMinus} />
                  </this.RemoveBlockButton>
                </this.BlockContainer>
              )
            }}
          >
            <this.AddButton onClick={this.addButtonStack}>
              <Icon icon={faPlus} />
            </this.AddButton>
          </Column>
          <Column id="leftSide" blocks={[]} title={leftSideTitle}>
            {solution.map(([left], index) => {
              return (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <this.Select
                    options={options}
                    value={options[left]}
                    onChange={this.leftSideChange(index)}
                    getOptionLabel={(option: Option) => `block-${option.value}`}
                  />
                  <this.RemoveSolutionButton
                    onClick={this.removeButtonSolution(index)}
                  >
                    <Icon icon={faMinus} />
                  </this.RemoveSolutionButton>
                </div>
              )
            })}
            <this.AddButton onClick={this.addButtonSolution}>
              <Icon icon={faPlus} />
            </this.AddButton>
          </Column>
          <Column id="rightSide" blocks={[]} title={rightSideTitle}>
            {solution.map(([_left, right], index) => {
              return (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <this.Select
                    key={index}
                    options={options}
                    value={options[right]}
                    onChange={this.rightSideChange(index)}
                    getOptionLabel={(option: Option) => `block-${option.value}`}
                  />
                  <this.RemoveSolutionButton
                    onClick={this.removeButtonSolution(index)}
                  >
                    <Icon icon={faMinus} />
                  </this.RemoveSolutionButton>
                </div>
              )
            })}
            <this.AddButton onClick={this.addButtonSolution}>
              <Icon icon={faPlus} />
            </this.AddButton>
          </Column>
        </div>
      </DragDropContext>
    )
  }

  private BlockContainer = styled.div({ display: 'flex', alignItems: 'center' })
  private Block = styled.div({ flexGrow: 1 })
  private AddButton = styled.button({
    borderRadius: '50%',
    outline: 'none',
    width: '35px',
    height: '35px',
    border: 'none',
    margin: 'auto',
    display: 'block'
  })
  private RemoveBlockButton = styled(this.AddButton)({
    margin: '5px'
  })
  private Select = styled(Select)({
    flexGrow: 1,
    margin: '5px'
  })
  private RemoveSolutionButton = styled(this.RemoveBlockButton)({
    marginLeft: 0
  })
}

export interface MatchingExerciseEditorProps {
  onChange: (state: Partial<MatchingExercisePluginState>) => void
  state: MatchingExercisePluginState
}

interface Option {
  value: number
}
