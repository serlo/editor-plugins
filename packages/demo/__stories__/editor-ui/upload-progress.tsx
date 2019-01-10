import { UploadProgress } from '@serlo/editor-ui'
import { Sidebar } from '@splish-me/editor-ui-sidebar'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

class DummyProvider extends React.Component<{}, { progress: number }> {
  state = { progress: 0 }

  public render() {
    const { progress } = this.state

    return (
      <React.Fragment>
        <button onClick={this.mockUpload}>Upload</button>
        <UploadProgress progress={progress} complete={progress >= 1} />
      </React.Fragment>
    )
  }

  private mockUpload = () => {
    this.setState({ progress: 0.1 })
    this.mockProgress()
  }

  private mockProgress = () => {
    this.setState(({ progress }) => {
      if (progress >= 1) {
        return null
      }

      setTimeout(() => {
        this.mockProgress()
      }, 250)
      return { progress: progress + 0.1 }
    })
  }
}

storiesOf('Upload Progress', module)
  .add('No progress, not completed', () => {
    return (
      <Sidebar active hideToggle>
        <UploadProgress complete={false} progress={0} />
      </Sidebar>
    )
  })
  .add('Progress, not completed', () => {
    return (
      <Sidebar active hideToggle>
        Foobar
        <UploadProgress complete={false} progress={0.1} />
      </Sidebar>
    )
  })
  .add('Dummy Provider', () => {
    return (
      <Sidebar active hideToggle>
        <DummyProvider />
      </Sidebar>
    )
  })
