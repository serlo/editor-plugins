module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(tsx?|js)$': 'babel-jest'
  },
  testMatch: ['**/__tests__/**/*.+(ts?(x)|js)']
}
