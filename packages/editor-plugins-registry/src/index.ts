import * as React from 'react'

export enum Plugin {
  Anchor = 'anchor',
  Blockquote = 'blockquote',
  Equations = 'equations',
  Geogebra = 'geogebra',
  Text = 'text'
}
// Slate = 'slate',
// Image = 'image',
// Spoiler = 'spoiler',
// License = 'license',
// Injection = 'injection',
// Highlight = 'highlight',
// MatchingExercise = 'matching-exercise',
// StepByStep = 'step-by-step',
// ScMcExercise = 'sc-mc-exercise',
// InputExercise = 'input-exercise',
// Hint = 'hint',
// Solution = 'solution',
// Table = 'table',

// const defaultPlugins = [
//   Plugin.Image,
//   Plugin.Spoiler,
//   Plugin.GeoGebra,
//   Plugin.License,
//   Plugin.Injection,
//   Plugin.Table,
// ]
const defaultPlugins = [
  Plugin.Text,
  Plugin.Anchor,
  Plugin.Blockquote,
  Plugin.Geogebra
]

// const newPlugins = [
//   Plugin.Highlight,
//   Plugin.MatchingExercise,
//   Plugin.StepByStep,
//   Plugin.InputExercise
// ]
const newPlugins = [Plugin.Equations]

// const exercisePlugins = [Plugin.Hint, Plugin.Solution, Plugin.ScMcExercise]
const exercisePlugins = []

export const createPluginFactory = (
  pluginRegistry: PluginRegistry
) => editableType => {
  const plugins = choosePlugins(editableType)
  return plugins.map(plugin => pluginRegistry[plugin])
}

function choosePlugins(type: string) {
  if (type === 'text-exercise' || type === 'grouped-text-exercise') {
    return [...defaultPlugins, ...exercisePlugins]
  }

  if (type === 'all') {
    return [...defaultPlugins, ...exercisePlugins, ...newPlugins]
  }

  return defaultPlugins
}

export type PluginRegistry = Record<
  Plugin,
  {
    name: string
    version: string
    Component: React.ComponentType<any>
  }
>
