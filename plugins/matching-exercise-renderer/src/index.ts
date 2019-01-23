import { DocumentIdentifier, RendererPlugin } from '@splish-me/editor'
import * as React from 'react'

import { MatchingExerciseRenderer } from './renderer'

export const matchingExerciseRendererPlugin: RendererPlugin<
  MatchingExercisePluginState
> = {
  Component: MatchingExerciseRenderer
}

export interface MatchingExercisePluginState {
  solution: Array<[number, number]>
  blockContent: Array<DocumentIdentifier>
}

export interface Block {
  id: string
  block: number
  content: React.ReactNode
}

export * from './renderer'
export * from './column'
export * from './row'
