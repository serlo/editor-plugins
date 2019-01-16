import * as React from 'react'

export enum Plugin {
  Anchor = 'anchor',
  Blockquote = 'blockquote',
  Equations = 'equations',
  Geogebra = 'geogebra',
  Highlight = 'highlight',
  Hint = 'hint',
  Image = 'image',
  Injection = 'injection',
  InputExercise = 'input-exercise',
  License = 'license',
  MatchingExercise = 'matching-exercise',
  ScMcExercise = 'sc-mc-exercise',
  Solution = 'solution',
  Spoiler = 'spoiler',
  StepByStep = 'step-by-step',
  Table = 'table',
  Text = 'text'
}

const defaultPlugins = [
  Plugin.Text,
  Plugin.Image,
  Plugin.Spoiler,
  Plugin.Injection,
  Plugin.Anchor,
  Plugin.Blockquote,
  Plugin.Geogebra,
  Plugin.Table
]

const newPlugins = [
  Plugin.Highlight,
  Plugin.Equations,
  Plugin.InputExercise,
  Plugin.License,
  Plugin.MatchingExercise,
  Plugin.StepByStep
]

const exercisePlugins = [Plugin.Solution, Plugin.Hint, Plugin.ScMcExercise]

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
