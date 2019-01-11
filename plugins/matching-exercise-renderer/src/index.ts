import { DocumentIdentifier } from '@splish-me/editor-core-types'
import * as React from 'react'

import { MatchingExerciseRenderer } from './renderer'

export const matchingExerciseRendererPlugin = {
  name: '@serlo-org/matching-exercise',
  version: '0.0.0',
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
