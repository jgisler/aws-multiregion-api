#! /usr/bin/env bash
set -x

source .env && \
npx rimraf sam/dist && mkdir sam/dist && \
npm prune --production && npm dedupe && \
zip -r sam/dist/dist.zip .env package.json src/ node_modules/ \
    -x node_modules/.bin/ node_modules/.cache/
