import * as React from 'react'
import axios from 'axios'

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
      <div style={{ height: '400px' }}>
        <div ref={this.container} style={{ height: '400px' }} />
        <button onClick={this.save}>Save</button>
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
