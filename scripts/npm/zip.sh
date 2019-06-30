#! /usr/bin/env bash
set -x

source .env && \
zip -r sam/dist.zip package.json src/ node_modules/ \
    -x node_modules/.bin/ node_modules/.cache/
