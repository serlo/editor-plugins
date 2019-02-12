import {
  ImagePluginState,
  ImageRenderer
} from '@serlo/editor-plugin-image-renderer'
import { Icon, faImages, styled } from '@serlo/editor-ui'
import {
  Checkbox,
  Input,
  Textarea,
  renderIntoSidebar
} from '@splish-me/editor-ui'
import * as React from 'react'

import { ImageLoaded, ImageUploaded, Upload } from './upload'
import { ImagePluginConfig } from '.'

export const createImageEditor = (
  config: ImagePluginConfig
): React.ComponentType<ImageEditorProps> => {
  return class ImageEditor extends React.Component<
    ImageEditorProps,
    ImageEditorState
  > {
    public state: ImageEditorState = {}

    public render(): React.ReactNode {
      const { readOnly, focused } = this.props
      const { src, description, href, target } = this.props.state

      return (
        <React.Fragment>
          {focused
            ? renderIntoSidebar(
                <React.Fragment>
                  <Input
                    placeholder="http://example.com/image.png"
                    label="Image location (url)"
                    value={src}
                    type="text"
                    onChange={this.handleChange('src')}
                  />
                  <br />
                  <Upload
                    config={config.upload}
                    onImageLoaded={this.handleImageLoaded}
                    onImageUploaded={this.handleImageUploaded}
                  />
                  <br />
                  <Textarea
                    placeholder="Gib hier eine Bildbeschreibung ein"
                    label="Image description"
                    value={description}
                    onChange={this.handleChange('description')}
                  />
                  <br />
                  <Input
                    placeholder="http://example.com"
                    label="Link location (url)"
                    type="text"
                    value={href}
                    onChange={this.handleChange('href')}
                  />
                  {href ? (
                    <React.Fragment>
                      <br />
                      <Checkbox
                        value={target === '_blank'}
                        label="Open in new window"
                        onChange={this.handleTargetChange}
                      />
                    </React.Fragment>
                  ) : null}
                </React.Fragment>
              )
            : null}
          {src || this.state.imagePreview ? (
            <ImageRenderer
              state={{
                ...this.props.state,
                src: this.state.imagePreview
                  ? this.state.imagePreview.dataUrl
                  : src
              }}
              disableMouseEvents={!readOnly}
            />
          ) : (
            <div>
              <this.ImgPlaceholderWrapper>
                <Icon icon={faImages} size="5x" />
              </this.ImgPlaceholderWrapper>
            </div>
          )}
        </React.Fragment>
      )
    }

    private handleChange(name: string) {
      return (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        const change = { [name]: event.target.value }
        this.props.onChange(change)
      }
    }

    private handleTargetChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target.checked) {
        this.props.onChange({
          target: '_blank',
          // noopener is safer but not supported in IE, so noreferrer adds some security
          rel: 'noreferrer noopener'
        })
      } else {
        this.props.onChange({
          target: null,
          rel: null
        })
      }
    }

    private handleImageLoaded = (image: ImageLoaded) => {
      this.setState({ imagePreview: image })
    }

    private handleImageUploaded = (state: ImageUploaded) => {
      this.setState({ imagePreview: undefined })
      this.props.onChange(state)
    }

    private ImgPlaceholderWrapper = styled.div({
      position: 'relative',
      width: '100%',
      textAlign: 'center'
    })
  }
}

export interface ImageEditorState {
  imagePreview?: ImageLoaded
}

export interface ImageEditorProps {
  state: ImagePluginState
  readOnly?: boolean
  focused?: boolean
  onChange: (state: Partial<ImagePluginState>) => void
}
