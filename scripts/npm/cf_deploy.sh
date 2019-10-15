#! /usr/bin/env bash
set -e

if [ -z ${1} ];
then
    echo "Usage: cf_deploy.sh {templateName}";
    exit 1;
else
    templateName=$1 && \
    source .env && \
    aws cloudformation deploy --stack-name ${StackName} \
        --template-file ${templateName}-out.yaml \
        --parameter-overrides ${CloudFormationParams} \
        --no-fail-on-empty-changeset \
        --s3-bucket ${DeploymentBucket} \
        --s3-prefix ${DeploymentPrefix} \
        --tags ${TagParams} \
        --region ${Region} \
        --profile ${Profile} \
        --capabilities CAPABILITY_NAMED_IAM
fi
