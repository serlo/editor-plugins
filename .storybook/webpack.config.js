module.exports = (_baseConfig, _env, defaultConfig) => {
  defaultConfig.module.rules = [
    {
      test: /\.(tsx?|js)$/,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader')
    },
    ...defaultConfig.module.rules.slice(1)
  ]
  defaultConfig.resolve.extensions.unshift('.ts', '.tsx')

  return defaultConfig
}
