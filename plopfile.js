module.exports = function(plop) {
  plop.addHelper(
    'prettierCommand',
    () =>
      'prettier --write "{{__tests__,src}/**/*,*}.{js,jsx,ts,tsx,css,scss,sass,less,json,md,markdown,yaml,yml}"'
  )

  plop.setGenerator('plugin', {
    description: 'create a renderer entry for a plugin',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'plugin name: '
      }
    ],
    actions: function(data) {
      let actions = [
        {
          type: 'addMany',
          destination: 'plugins/{{dashCase name}}/',
          base: 'plop-template/foobar/',
          templateFiles: '**/*'
        },
        {
          type: 'addMany',
          destination: 'plugins/{{dashCase name}}-renderer/',
          base: 'plop-template/foobar-renderer/',
          templateFiles: '**/*'
        }
      ]

      const createPattern = entry => {
        return new RegExp(
          `(${entry}\\s*?\\{([^}](?!\\s*@serlo\\/editor-([^p]|plugin-(${alphabeticExclusionPattern(
            data.name
          )}))))*)`,
          'gm'
        )
      }

      const alphabeticExclusionPattern = rawName => {
        const name = rawName.toLowerCase()
        let parts = []
        for (let i = 0; i < name.length; i++) {
          if (!/[a-y]/.test(name.charAt(i))) {
            continue
          }
          const followingChar = String.fromCharCode(name.charCodeAt(i) + 1)
          parts = [...parts, `${name.substr(0, i)}[${followingChar}-z]`]
        }
        return `${parts.join('|')}|${name}\\w*`
      }

      actions = actions.concat([
        {
          type: 'modify',
          path: 'tsconfig.json',
          pattern: createPattern('"paths":'),
          template:
            '$1"@serlo/editor-plugin-{{dashCase name}}": ["plugins/{{dashCase name}}/src"],\n"@serlo/editor-plugin-{{dashCase name}}-renderer": ["plugins/{{dashCase name}}-renderer/src"],\n'
        },
        {
          type: 'modify',
          path: 'packages/demo/.storybook/webpack.config.js',
          pattern: createPattern('alias:'),
          template: `$1'@serlo/editor-plugin-{{dashCase name}}': '@serlo/editor-plugin-{{dashCase name}}/src',\n'@serlo/editor-plugin-{{dashCase name}}-renderer':'@serlo/editor-plugin-{{dashCase name}}-renderer/src',\n`
        }
      ])
      return actions
    }
  })
}
