const isProduction = process.env.NODE_ENV === 'production'

const createAlias = name => {
  return {
    [`${name}`]: `${name}/${isProduction ? 'lib' : 'src'}`
  }
}

module.exports = () => {
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>0.25%']
        }
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ]

  const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          ...createAlias('@serlo-org/html-renderer'),
          ...createAlias('@serlo-org/editor-plugin-blockquote'),
          ...createAlias('@serlo-org/editor-plugins'),
          ...createAlias('@serlo-org/editor-plugin-geogebra'),
          ...createAlias('@serlo-org/editor-plugin-highlight'),
          ...createAlias('@serlo-org/editor-plugin-hint'),
          ...createAlias('@serlo-org/editor-plugin-infobox'),
          ...createAlias('@serlo-org/editor-plugin-injection'),
          ...createAlias('@serlo-org/editor-plugin-input-exercise'),
          ...createAlias('@serlo-org/editor-plugin-license'),
          ...createAlias('@serlo-org/editor-plugin-sc-mc-exercise'),
          ...createAlias('@serlo-org/editor-plugin-solution'),
          ...createAlias('@serlo-org/editor-plugin-spoiler'),
          ...createAlias('@serlo-org/editor-plugin-table'),
          ...createAlias('@serlo-org/editor-plugin-equations')
        }
      }
    ]
  ]

  return { plugins, presets }
}
