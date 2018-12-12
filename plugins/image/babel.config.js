module.exports = api => {
  const isProduction = () => process.env.NODE_ENV === 'production'
  api.cache(isProduction)

  return {
    presets: ['@splish-me/editor-babel-preset/src', '@babel/preset-flow']
  }
}
