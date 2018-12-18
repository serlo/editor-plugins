const defaultPlugins = [
  'slate',
  'image',
  'divider',
  'spacer',
  'spoiler',
  'geogebra',
  'license',
  'injection',
  'table',
  'blockquote'
]

const newPlugins = ['highlight', 'matchingExercise', 'stepByStep']

const exercisePlugins = ['scMcExercise', 'textfield', 'solution', 'hint', 'stepByStep']

export default pluginMapping => editableType => {
  const plugins = choosePlugins(editableType)
  return plugins.map(plugin => pluginMapping[plugin])
}

const choosePlugins = type => {
  if (type === 'text-exercise' || type === 'grouped-text-exercise') {
    return [...defaultPlugins, ...exercisePlugins]
  }

  if (type === 'all') {
    return [...defaultPlugins, ...exercisePlugins, ...newPlugins]
  }

  return defaultPlugins
}
