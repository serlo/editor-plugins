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
    '@babel/plugin-proposal-json-strings'
  ]

  return { plugins, presets }
}
