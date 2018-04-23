#!/usr/bin/env bash

set -euo pipefail

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
lerna publish --skip-git --repo-version=$(git describe --tag) --yes --force-publish=*
