export interface Config {
  upload: UploadConfig
}

export interface UploadConfig {
  url: string
  maxFileSize: number
  allowedExtensions: string[]
}

export interface UploadProps {
  config: UploadConfig
  onImageLoaded?: Function
  onImageUploaded?: Function
}

interface ImageState {
  src: string
  description: string
  href?: string
  target?: string
  rel?: string
}
export interface ImageRendererProps {
  state: ImageState
  readOnly?: boolean
}

export interface ImageComponentProps {
  state: ImageState
  readOnly: boolean
  focused: boolean
  onChange: Function
}

export interface ImageLoaded {
  file: File
}

export interface ImageUploaded {
  url: string
}
