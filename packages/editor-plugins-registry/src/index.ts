import * as React from 'react'

export enum Plugin {
  Anchor = 'anchor',
  Blockquote = 'blockquote',
  Text = 'text'
}
// Slate = 'slate',
// Image = 'image',
// Spoiler = 'spoiler',
// GeoGebra = 'geo-gebra',
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
// Equations = 'equation',

// const defaultPlugins = [
//   Plugin.Image,
//   Plugin.Spoiler,
//   Plugin.GeoGebra,
//   Plugin.License,
//   Plugin.Injection,
//   Plugin.Table,
//   Plugin.Equations,
// ]
const defaultPlugins = [Plugin.Text, Plugin.Anchor, Plugin.Blockquote]

// const newPlugins = [
//   Plugin.Highlight,
//   Plugin.MatchingExercise,
//   Plugin.StepByStep,
//   Plugin.InputExercise
// ]
const newPlugins = []

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
