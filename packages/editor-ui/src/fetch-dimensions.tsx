import * as R from 'ramda'
import * as React from 'react'

export class FetchDimensions extends React.Component<
  FetchDimensionsProps,
  FetchDimensionsState
> {
  public state = {
    heights: R.times(() => null, this.props.length),
    widths: R.times(() => null, this.props.length)
  }

  public componentDidUpdate(
    prevProps: Readonly<FetchDimensionsProps>,
    prevState: Readonly<FetchDimensionsState>,
    snapshot?: any
  ): void {
    const all = R.all(height => typeof height === 'number', this.state.heights)

    if (all && !this.done) {
      this.done = true
      this.props.onDone(this.state)
    }
  }

  public render() {
    const createRef = (index: number) => (instance: HTMLElement) => {
      console.log(index, this.props.length)
      if (!instance) {
        return null
      }

      this.setState(state => {
        if (typeof state.heights[index] === 'number') {
          return null
        }

        return {
          heights: R.update(index, instance.offsetHeight, state.heights),
          widths: R.update(index, instance.offsetWidth, state.widths)
        }
      })
    }

    return this.props.render(createRef)
  }

  private done = false
}

export interface FetchDimensionsProps {
  length: number
  render: (
    createRef: (index: number) => (instance: HTMLElement | null) => void
  ) => React.ReactNode
  onDone: (dimensions: { heights: number[]; widths: number[] }) => void
}

interface FetchDimensionsState {
  // FIXME: TS converts this to number[] somehow
  heights: (number | null)[]
  widths: (number | null)[]
}
