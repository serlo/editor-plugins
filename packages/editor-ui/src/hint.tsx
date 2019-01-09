import * as React from 'react'

import { styled } from './styled'

export class Hint extends React.Component<HintProps, HintState> {
  public state: HintState = { hidden: true }

  public render() {
    const { children, kind, shown } = this.props
    const hidden = !shown && this.state.hidden

    return (
      <this.Wrapper hidden={hidden}>
        <this.Toggle onClick={this.onToggle}>
          <a>
            {kind} {this.showTitle()}
            {hidden ? (
              <span className="fa fa-caret-down" />
            ) : (
              <span className="fa fa-caret-up" />
            )}
          </a>
        </this.Toggle>
        <this.Content>{children}</this.Content>
      </this.Wrapper>
    )
  }

  private showTitle(): React.ReactNode {
    const { title } = this.props

    if (!title) {
      return null
    }

    return <React.Fragment>({title})&nbsp;</React.Fragment>
  }

  private onToggle = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  private Wrapper = styled.div<{ hidden?: boolean }>(({ hidden }) => {
    return {
      marginTop: '12px',
      marginBottom: '20px',
      border: hidden ? 'none' : '1px solid #d9edf7',
      borderRadius: '2px',
      boxShadow: hidden ? 'none' : '0 1px 1px rgba(0, 0, 0, 0.05)'
    }
  })

  private Toggle = styled.div<{ hidden?: boolean }>(({ hidden }) => {
    return {
      backgroundColor: hidden ? 'transparent' : '#d9edf7',
      padding: '10px 15px 10px 10px',
      borderColor: hidden ? 'transparent' : '#d9edf7',
      textAlign: 'left',
      cursor: 'pointer'
    }
  })

  private Content = styled.div<{ hidden?: boolean }>(({ hidden }) => {
    return { display: hidden ? 'none' : 'block' }
  })
}

export interface HintProps {
  title: React.ReactNode
  kind: string
  shown?: boolean
}

interface HintState {
  hidden: boolean
}
