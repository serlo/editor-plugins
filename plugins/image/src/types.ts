export interface Config {
  upload: UploadConfig
}

export interface UploadConfig {
  url: string
  maxFileSize: number
  allowedExtensions: string[]
  paramName?: string
  getAdditionalFields?: Function
}

export enum FileErrorCode {
  TOO_MANY_FILES,
  NO_FILE_SELECTED,
  BAD_EXTENSION,
  FILE_TOO_BIG,
  UPLOAD_FAILED
}

export type FileError = {
  errorCode: FileErrorCode
  message: string
}

export interface UploadProps {
  config: UploadConfig
  onError?: (errors: FileError[]) => void
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
  dataUrl: string
}

export interface ImageUploaded {
  url: string
}
