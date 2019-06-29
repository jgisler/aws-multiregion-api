#! /usr/bin/env bash
set -e

if [ -z ${1} ];
then
    echo "Usage: cf_package.sh {template_path}";
    exit 1;
else
    templateFile=$1 && \
    source .env && \
    aws cloudformation package \
        --s3-bucket ${DeploymentBucket} \
        --s3-prefix ${DeploymentPrefix} \
        --template-file ${templateFile} \
        --output-template-file ${templateFile}-out.yaml \
        --region ${Region} \
        --profile ${Profile}
fi
