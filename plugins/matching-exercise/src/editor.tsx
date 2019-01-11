import {
  Column,
  Row,
  Block,
  MatchingExercisePluginState,
  MatchingExerciseRenderer
} from '@serlo/editor-plugin-matching-exercise-renderer'
import { Icon, faPlus, faMinus, styled, faCheck } from '@serlo/editor-ui'
import {
  createDocumentIdentifier,
  Document
} from '@splish-me/editor-core-document'
import * as R from 'ramda'
import * as React from 'react'

export class MatchingExerciseEditor extends React.Component<
  MatchingExerciseEditorProps,
  MatchingExerciseState
> {
  public state = {
    leftSide: [],
    rightSide: []
  }
  removeButtonStack = rowIndex => () => {
    const { onChange, state } = this.props

    const newBlockContent = [...state.blockContent]
    newBlockContent.splice(rowIndex, 1)

    onChange({
      blockContent: newBlockContent
    })
  }
  removeButtonSolution = rowIndex => () => {
    const { leftSide, rightSide } = this.state
    const newLeftSide = [...leftSide]
    const newRightSide = [...rightSide]

    newLeftSide.splice(rowIndex, 1)
    newRightSide.splice(rowIndex, 1)

    this.setState({ leftSide: newLeftSide, rightSide: newRightSide }, () => {
      const { onChange, state } = this.props

      const newSolution = [...state.solution]
      newSolution.splice(rowIndex, 1)

      onChange({
        solution: newSolution
      })
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
  private moveBlock = (index: number) => (block: Block) => {
    const side =
      this.state.leftSide > this.state.rightSide ? 'rightSide' : 'leftSide'
    const newSide = [...this.state[side]]
    newSide.push(block)

    this.setState(
      { [side]: newSide } as Pick<MatchingExerciseState, typeof side>,
      () => {
        if (side === 'rightSide') {
          const newSolution = [...this.props.state.solution]
          newSolution.push(
            (R.last(this.state.leftSide), R.last(this.state.rightSide))
          )

          this.props.onChange({ solution: newSolution })
        }
      }
    )
  }

  public render() {
    const { blockContent } = this.props.state
    const stack: Block[] = blockContent.map((id, index) => {
      const content = <Document state={id} />
      return {
        id: `stack-${id.id}`,
        block: index,
        content: content
      }
    })

    if (this.props.readOnly) {
      return <MatchingExerciseRenderer {...this.props} />
    }
    const leftSide = this.state.leftSide
    const rightSide = this.state.rightSide
    const blocks = R.zip(
      leftSide as (Block | undefined)[],
      (rightSide as (Block | undefined)[]).concat(
        R.repeat(undefined, leftSide.length - rightSide.length)
      )
    ) as [Block | undefined, Block | undefined][]
    return (
      <React.Fragment>
        <Column
          blocks={stack}
          Container={this.StackContainer}
          renderBlock={(block, index) => {
            return (
              <this.BlockContainer>
                {' '}
                <this.BlockContainerInner>
                  {block}
                </this.BlockContainerInner>{' '}
                <this.IconButton
                  onClick={() => this.moveBlock(index)(stack[index])}
                >
                  <Icon icon={faCheck} />
                </this.IconButton>
                <this.IconButton onClick={this.removeButtonStack(index)}>
                  <Icon icon={faMinus} />
                </this.IconButton>
              </this.BlockContainer>
            )
          }}
        />
        <this.AddButton onClick={this.addButtonStack}>
          <Icon icon={faPlus} />
        </this.AddButton>
        <div>
          <Row
            blocks={blocks}
            title="Funktion/Ableitung"
            state={this.props.state}
            preview
            renderRow={(row, index) => {
              return (
                <React.Fragment>
                  {row}
                  <this.IconButton onClick={this.removeButtonSolution(index)}>
                    <Icon icon={faMinus} />
                  </this.IconButton>
                </React.Fragment>
              )
            }}
          />
        </div>
      </React.Fragment>
    )
  }

  private StackContainer = styled.div({})
  private BlockContainerInner = styled.div({ flexGrow: 1 })
  private BlockContainer = styled.div({ display: 'flex', alignItems: 'center' })
  private AddButton = styled.button({
    borderRadius: '50%',
    outline: 'none',
    width: '35px',
    height: '35px',
    border: 'none',
    margin: 'auto',
    display: 'block'
  })
  private IconButton = styled(this.AddButton)({
    margin: '5px'
  })
}

export interface MatchingExerciseEditorProps {
  onChange: (state: Partial<MatchingExercisePluginState>) => void
  state: MatchingExercisePluginState
  readOnly?: boolean
}

export interface MatchingExerciseState {
  leftSide: Block[]
  rightSide: Block[]
}
