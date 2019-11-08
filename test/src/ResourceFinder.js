/**
 * Functions for finding stack resources for testing
 */

const { LambdaHelper, CloudFormationHelper } = require('./helpers');
const { describeStackResource } = CloudFormationHelper;

async function getUserActivityV1Url() {
   const apiId = await getPhysicalResourceId(process.env.STACK_NAME, 'UserActivityV1');
   const stageId = await getPhysicalResourceId(process.env.STACK_NAME, 'UserActivityV1Stage');
   return `https://${apiId}.execute-api.${process.env.AWS_REGION}.amazonaws.com/${stageId}/useractivity/v1`;
}

async function getUserActivityTableName() {
   return getPhysicalResourceId(process.env.STACK_NAME, 'UserActivityTable');
}

async function getPhysicalResourceId(stackName, logicalResourceId) {
   const resourceDescription = await describeStackResource(stackName, logicalResourceId);
   if (resourceDescription) {
      // console.debug(resourceDescription);
      return resourceDescription.PhysicalResourceId;
   }
   return;
}

module.exports = { getUserActivityTableName, getUserActivityV1Url };
