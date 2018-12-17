const defaultPlugins = [
  'slate',
  // FIXME:
  // 'image',
  'divider',
  'spacer',
  'spoiler',
  'geogebra',
  'license',
  'injection',
  'table',
  'blockquote'
]

const newPlugins = [
  'highlight'
]

const exercisePlugins = ['scMcExercise', 'textfield', 'solution', 'hint']

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
