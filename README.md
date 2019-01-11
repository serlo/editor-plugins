<img src="https://assets.serlo.org/meta/logo.png" alt="Serlo logo" title="Serlo" align="right" height="60" />

# Editor Plugins [![Build status](https://img.shields.io/travis/com/serlo/editor-plugins/development.svg)](https://travis-ci.com/serlo/editor-plugins)

This is a monorepo for all plugins for the [Splish Editor](https://github.com/splish/editor) created for the E-Learning Website [www.serlo.org](https://de.serlo.org).

## Run the storybook

To run the storybook, run the following commands:

```
yarn
yarn start
```

After that open [http://localhost:9009](http://localhost:9009) in your browser.

## Adding a new plugin

To create a new plugin `bar`, you have to do the following steps:

- Copy [`template/foobar`](template/foobar) to `plugins/bar`
- Copy [`template/foobar-renderer`](template/foobar-renderer) to `plugins/bar-renderer`
- Replace `foobar` with `bar` in `plugins/bar/package.json` and `plugins/bar-renderer/package.json`
- Add an entry in `paths` in [`tsconfig.json`](tsconfig.json) for `@serlo/editor-plugin-bar`
- Add an entry in `paths` in [`tsconfig.json`](tsconfig.json) for `@serlo/editor-plugin-bar-renderer`
- Add an entry in `alias` in [`demo/.storybook/webpack.config.js`](demo/.storybook/webpack.config.js) for `@serlo/editor-plugin-bar`
- Add an entry in `alias` in [`demo/.storybook/webpack.config.js`](demo/.storybook/webpack.config.js) for `@serlo/editor-plugin-bar-renderer`
- `yarn` (so that the two new packages get symlinked
- Add stories for your plugins in `demo/__stories__/bar.tsx`

### What does Lerna do?

Lerna is a tool to manage multiple packages in one repository. (In our case the multiple packages are yarn workspaces defined in the `package.json`). We want to be able to import every plugin on its own, so we need a tool which links the different packages together.
This is where Lerna comes into play. It automatically resolves local packages in the dependencies and and links them correctly, so they can be imported and handled like any published npm package (e.g without knowledge about the file structure).
Lerna also provides the possibility to run a script in all packages, so `lerna run build:watch` executes the `build:watch` script in every package, so you don't have to call them all by yourself.
