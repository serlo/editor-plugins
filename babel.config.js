module.exports = api => {
  const isProduction = () => process.env.NODE_ENV === 'production'
  api.cache(isProduction)

  return {
    presets: ['@serlo/editor-plugins-config/src/babel-preset']
  }
}
