import {
  Editable,
  EditableIdentifier
} from '@splish-me/editor-core/lib/editable.component'
import { css } from 'emotion'
import * as React from 'react'

export class Spoiler extends React.Component<SpoilerProps, SpoilerState> {
  public state: SpoilerState = { hidden: true }

  public render() {
    const { state, readOnly, onChange } = this.props

    return (
      <div
        className={css({
          marginTop: '12px',
          marginBottom: '20px',
          border: '1px solid #dddddd',
          borderRadius: '2px',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.05)'
        })}
      >
        <div
          className={css({
            backgroundColor: '#f5f5f5',
            padding: '10px 15px 10px 40px',
            position: 'relative',
            borderColor: '#dddddd',
            textAlign: 'left',
            cursor: 'pointer',
            minHeight: '41px',

            '& .fa': {
              position: 'absolute',
              bottom: '13px',
              left: '15px'
            }
          })}
          onClick={this.onToggle}
        >
          {this.state.hidden ? (
            <span className="fa fa-caret-square-o-down" />
          ) : (
            <span className="fa fa-caret-square-o-up" />
          )}
          {readOnly ? (
            state.title
          ) : (
            <input
              className={css({
                '&:active': {
                  color: '#ffffff'
                }
              })}
              onChange={e => {
                onChange({ title: e.target.value })
              }}
              value={state.title}
              placeholder="Your Title Here"
            />
          )}
        </div>

        <div
          className={css({
            padding: '15px'
          })}
          style={{
            display: this.state.hidden && readOnly ? 'none' : 'block'
          }}
        >
          <Editable id={state.content} />
        </div>
      </div>
    )
  }

  onToggle = () => {
    this.setState(({ hidden }) => {
      return { hidden: !hidden }
    })
  }
}

export interface SpoilerProps {
  onChange: (state: Partial<SpoilerPluginState>) => void
  state: SpoilerPluginState
  readOnly?: boolean
}

export interface SpoilerPluginState {
  content: EditableIdentifier
  title: string
}

interface SpoilerState {
  hidden: boolean
}
