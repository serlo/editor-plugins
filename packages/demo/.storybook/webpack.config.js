module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        [
          require.resolve('babel-preset-react-app'),
          { flow: false, typescript: true }
        ]
      ],
      plugins: [
        [
          require.resolve('babel-plugin-module-resolver'),
          {
            alias: {
              '@serlo-org/editor-plugins': '@serlo-org/editor-plugins/src',
              '@serlo-org/editor-plugins-registry':
                '@serlo-org/editor-plugins-registry/src',
              '@serlo-org/editor-plugins-renderer':
                '@serlo-org/editor-plugins-renderer/src',
              '@serlo-org/editor-plugin-text':
                '@serlo-org/editor-plugin-text/src',
              '@serlo-org/editor-plugin-text-renderer':
                '@serlo-org/editor-plugin-text-renderer/src',
              '@serlo-org/html-renderer': '@serlo-org/html-renderer/src',
              '@serlo-org/storybook-helpers': '@serlo-org/storybook-helpers/src'
            }
          }
        ]
      ]
    }
  })
  config.resolve.extensions.push('.ts', '.tsx')
  config.externals = [require('webpack-require-http')]
  return config
}
