#! /usr/bin/env bash
set -e

if [ -z ${1} ];
then
    echo "Usage: cf_package.sh {templateName}";
    exit 1;
else
    templateName=$1 && \
    source .env && \
    npx rimraf sam/${templateName}-out.yaml && \
    aws cloudformation package \
        --template-file sam/${templateName}.yaml \
        --output-template-file sam/${templateName}-out.yaml \
        --s3-bucket ${DeploymentBucket} \
        --s3-prefix ${DeploymentPrefix} \
        --region ${Region} \
        --profile ${Profile}
fi
