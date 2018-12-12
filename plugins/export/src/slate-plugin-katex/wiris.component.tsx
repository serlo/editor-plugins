import * as React from 'react'
import axios from 'axios'
import { css, cx } from 'emotion'

type MathML = string
type LaTeX = string

let wiris: {
  getMathML: () => MathML
  setMathML: (mathML: MathML) => void
  insertInto: (container: HTMLElement) => void
}

export interface WirisProps {
  initialSrc: LaTeX
  onSave: (src: LaTeX) => void
  onCancel: () => void
}

export class Wiris extends React.Component<WirisProps> {
  private container = React.createRef<HTMLDivElement>()

  public componentDidMount(): void {
    if (wiris) {
      this.initWiris()
    } else {
      require('https://www.wiris.net/demo/editor/editor').then(() => {
        // @ts-ignore
        wiris = com.wiris.jsEditor.JsEditor.newInstance({
          language: 'en' // FIXME:
        })
        this.initWiris()
      })
    }
  }

  public render() {
    return (
      <div
        className={css({
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(0,0,0,0.3)',
          left: '0%',
          top: '0%',
          position: 'fixed',
          zIndex: 9000
        })}
      >
        <div
          className={css({
            position: 'absolute',
            backgroundColor: 'white',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
          })}
        >
          <div
            ref={this.container}
            className={css({
              height: '400px',
              margin: '10px'
            })}
          />
          <div className={css({ backgroundColor: 'white', margin: '10px' })}>
            <button className="btn btn-cancel" onClick={this.props.onCancel}>
              Cancel
            </button>
            <button className="btn btn-success pull-right" onClick={this.save}>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }

  private save = async () => {
    const src = await Wiris.mmlToLatex(wiris.getMathML())

    this.props.onSave(src)
  }

  private async initWiris(): Promise<void> {
    const container = this.container.current

    if (!container) {
      return
    }

    wiris.insertInto(container)
    wiris.setMathML(await Wiris.latexToMML(this.props.initialSrc))
  }

  private static async latexToMML(latex: LaTeX): Promise<MathML> {
    const { data } = await axios.get(
      `https://www.wiris.net/demo/editor/latex2mathml?latex=${encodeURIComponent(
        latex
      )}`
    )

    return data
  }

  private static async mmlToLatex(mml: MathML): Promise<LaTeX> {
    const { data } = await axios.get(
      `https://www.wiris.net/demo/editor/mathml2latex?mml=${encodeURIComponent(
        mml
      )}`
    )

    return data
  }
}
