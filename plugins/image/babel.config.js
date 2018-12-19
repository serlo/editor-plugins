module.exports = api => {
  const isProduction = () => process.env.NODE_ENV === 'production'
  api.cache(isProduction)

  return {
    presets: ['@serlo-org/editor-plugins-config/src/babel-preset']
  }
}
