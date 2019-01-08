import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

export class UploadProgress extends React.Component<UploadProgressProps> {
  public render() {
    const { progress } = this.props

    if (!progress) {
      return null
    }

    if (progress > 0 && progress < 1) {
      return <FontAwesomeIcon icon={faSpinner} spin color="#ffffff" size="lg" />
    }

    return null
  }
}

export interface UploadProgressProps {
  progress?: number
  complete?: boolean
}
