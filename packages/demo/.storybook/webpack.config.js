module.exports = (_baseConfig, _env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.tsx?$/,
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
              '@serlo-org/editor-plugin-anchor':
                '@serlo-org/editor-plugin-anchor/src',
              '@serlo-org/editor-plugin-anchor-renderer':
                '@serlo-org/editor-plugin-anchor-renderer/src',
              '@serlo-org/editor-plugin-blockquote':
                '@serlo-org/editor-plugin-blockquote/src',
              '@serlo-org/editor-plugin-blockquote-renderer':
                '@serlo-org/editor-plugin-blockquote-renderer/src',
              '@serlo-org/editor-plugin-equations':
                '@serlo-org/editor-plugin-equations/src',
              '@serlo-org/editor-plugin-equations-renderer':
                '@serlo-org/editor-plugin-equations-renderer/src',
              '@serlo-org/editor-plugin-geogebra':
                '@serlo-org/editor-plugin-geogebra/src',
              '@serlo-org/editor-plugin-geogebra-renderer':
                '@serlo-org/editor-plugin-geogebra-renderer/src',
              '@serlo-org/editor-plugin-highlight':
                '@serlo-org/editor-plugin-highlight/src',
              '@serlo-org/editor-plugin-highlight-renderer':
                '@serlo-org/editor-plugin-highlight-renderer/src',
              '@serlo-org/editor-plugin-hint':
                '@serlo-org/editor-plugin-hint/src',
              '@serlo-org/editor-plugin-hint-renderer':
                '@serlo-org/editor-plugin-hint-renderer/src',
              '@serlo-org/editor-plugin-image':
                '@serlo-org/editor-plugin-image/src',
              '@serlo-org/editor-plugin-image-renderer':
                '@serlo-org/editor-plugin-image-renderer/src',
              '@serlo-org/editor-plugin-injection':
                '@serlo-org/editor-plugin-injection/src',
              '@serlo-org/editor-plugin-injection-renderer':
                '@serlo-org/editor-plugin-injection-renderer/src',
              '@serlo-org/editor-plugin-input-exercise':
                '@serlo-org/editor-plugin-input-exercise/src',
              '@serlo-org/editor-plugin-input-exercise-renderer':
                '@serlo-org/editor-plugin-input-exercise-renderer/src',
              '@serlo-org/editor-plugin-license':
                '@serlo-org/editor-plugin-license/src',
              '@serlo-org/editor-plugin-license-renderer':
                '@serlo-org/editor-plugin-license-renderer/src',
              '@serlo-org/editor-plugin-matching-exercise':
                '@serlo-org/editor-plugin-matching-exercise/src',
              '@serlo-org/editor-plugin-matching-exercise-renderer':
                '@serlo-org/editor-plugin-matching-exercise-renderer/src',
              '@serlo-org/editor-plugin-sc-mc-exercise':
                '@serlo-org/editor-plugin-sc-mc-exercise/src',
              '@serlo-org/editor-plugin-sc-mc-exercise-renderer':
                '@serlo-org/editor-plugin-sc-mc-exercise-renderer/src',
              '@serlo-org/editor-plugin-solution':
                '@serlo-org/editor-plugin-solution/src',
              '@serlo-org/editor-plugin-solution-renderer':
                '@serlo-org/editor-plugin-solution-renderer/src',
              '@serlo-org/editor-plugin-spoiler':
                '@serlo-org/editor-plugin-spoiler/src',
              '@serlo-org/editor-plugin-spoiler-renderer':
                '@serlo-org/editor-plugin-spoiler-renderer/src',
              '@serlo-org/editor-plugin-step-by-step':
                '@serlo-org/editor-plugin-step-by-step/src',
              '@serlo-org/editor-plugin-step-by-step-renderer':
                '@serlo-org/editor-plugin-step-by-step-renderer/src',
              '@serlo-org/editor-plugin-table':
                '@serlo-org/editor-plugin-table/src',
              '@serlo-org/editor-plugin-table-renderer':
                '@serlo-org/editor-plugin-table-renderer/src',
              '@serlo-org/editor-plugin-text':
                '@serlo-org/editor-plugin-text/src',
              '@serlo-org/editor-plugin-text-renderer':
                '@serlo-org/editor-plugin-text-renderer/src',
              '@serlo-org/editor-ui': '@serlo-org/editor-ui/src',
              '@serlo-org/html-renderer': '@serlo-org/html-renderer/src',
              '@serlo-org/storybook-helpers': '@serlo-org/storybook-helpers/src'
            }
          }
        ]
      ]
    }
  })
  defaultConfig.resolve.extensions.push('.ts', '.tsx')
  defaultConfig.externals = [require('webpack-require-http')]

  return defaultConfig
}
