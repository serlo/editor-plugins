import { css } from 'emotion'
import * as React from 'react'

export class Hint extends React.Component<HintProps, HintState> {
  public state: HintState = { hidden: true }

  onToggle = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const { children, kind, shown } = this.props
    const hidden = !shown && this.state.hidden

    return (
      <div
        className={css({
          marginTop: '12px',
          marginBottom: '20px',
          border: hidden ? 'none' : '1px solid #d9edf7',
          borderRadius: '2px',
          boxShadow: hidden ? 'none' : '0 1px 1px rgba(0, 0, 0, 0.05)'
        })}
      >
        <div
          className={css({
            backgroundColor: hidden ? 'transparent' : '#d9edf7',
            padding: '10px 15px 10px 10px',
            borderColor: hidden ? 'transparent' : '#d9edf7',
            textAlign: 'left',
            cursor: 'pointer'
          })}
          onClick={this.onToggle}
        >
          <a>
            {kind} {this.showTitle()}
            {hidden ? (
              <span className="fa fa-caret-down" />
            ) : (
              <span className="fa fa-caret-up" />
            )}
          </a>
        </div>
        <div
          style={{
            display: hidden ? 'none' : 'block'
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  private showTitle(): React.ReactNode {
    const { title } = this.props

    if (!title) {
      return null
    }

    return <React.Fragment>({title})&nbsp;</React.Fragment>
  }
}

export interface HintProps {
  title: React.ReactNode
  children: React.ReactNode
  kind: string
  shown?: boolean
}

interface HintState {
  hidden: boolean
}
