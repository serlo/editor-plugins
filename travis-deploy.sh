#!/usr/bin/env bash
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
yarn lerna publish --skip-git --repo-version=$(git describe --tag) --yes --force-publish=*
